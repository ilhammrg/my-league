import { renderLeague, renderClub } from './data-source/league-render.js';
import { getClubPromised } from './data-source/league-api.js';
import { insertClub, deleteClub, createDB, getAllClubs } from './db/database.js';
import HomePage from './pages/home.page.js';
import SavedClubsPage from './pages/saved-clubs.page.js';

const baseUrl = 'https://api.football-data.org/v2/';

async function registerServiceWorker() {
    return await navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('Service-worker: Register success.');
            return registration;
        })
        .catch(err => {
            console.error('Service-worker: Register failed.', err);
        });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            switch(result) {
                case('granted'):
                    console.log('Notification: Allowed.');
                    break;
                case('denied'):
                    console.log('Notification: Disabled.');
                    break;
                case('default'):
                    console.log('Notification: Permission dialog closed.');
                    break;
            }
            
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BFXCX6pO_bpGnDPHRpkiplZ_Z4cIlhL8iATRl-h1eIcmanviJqc9f-hVw7LfHxSs46IjJOIOKGVPLWyrKOimdfA")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function handleSaveClub(clubUrl) {
    const clubItem = getClubPromised(clubUrl);
    const saveButton = document.querySelector('.save-button');
    
    saveButton.addEventListener('click', () => {
        clubItem.then(club => {
            insertClub(club);
        });
    });
}

function getSavedClubs() {
    getAllClubs().then(clubs => {
        if (clubs.length == 0) {
            const savedClubsElement = new SavedClubsPage();
            savedClubsElement.renderEmpty();
        } else {
            const savedClubsElement = new SavedClubsPage();
            savedClubsElement.render(clubs);
            let removeButton = document.querySelectorAll('.remove-button');
            for (let button of removeButton) {
                button.addEventListener('click', function(event) {
                    let keyPath = parseInt(event.target.dataset.keypath);
                    deleteClub(keyPath).then(() => {
                        getSavedClubs();
                    });
                });
            }
        } 
    });
}

function urlIdCorrection(urlHash) {
    return urlHash.replace('#', '');
}

function getLeagueInformation(hash, url) {
    const leagueId = urlIdCorrection(hash);
    renderLeague(url + leagueId + '/standings', url + leagueId + '/scorers');
}

function handleUrlChange() {
    window.addEventListener("hashchange", async () => {
        const urlHash = window.location.hash;
        switch(true) {
            case (urlHash.includes('competitions/2021')):
                getLeagueInformation(window.location.hash, baseUrl)
                break;
            case (urlHash.includes('competitions/2014')):
                getLeagueInformation(window.location.hash, baseUrl);
                break;
            case (urlHash.includes('competitions/2019')):
                getLeagueInformation(window.location.hash, baseUrl);
                break;
            case (urlHash.includes('teams')):
                const clubID = urlIdCorrection(window.location.hash);
                await renderClub(baseUrl + clubID);
                handleSaveClub(baseUrl + clubID);
                break;
            case (urlHash.includes('home')):
                HomePage();
                break;
            case (urlHash.includes('saved-clubs')):
                getSavedClubs();
                break;
        }
    });
}

const App = () => {

    // Register Service Worker
    if (!('serviceWorker' in navigator)) {
        console.error("This browser does not support Service Worker");
    } else {
        registerServiceWorker();
        requestPermission();
    }

    // Initiate database
    createDB();

    // Handle get request
    handleUrlChange();
}

export default App;