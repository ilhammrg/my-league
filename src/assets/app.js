import { renderLeague, renderClub } from './data-source/league-render.js';
import { getClubPromised } from './data-source/league-api.js';
import { saveClub, deleteClub } from './db/db.js';
import HomePage from './pages/home.page.js';
import SavedClubsPage from './pages/saved-clubs.page.js';

const baseUrl = 'https://api.football-data.org/v2/';

const registerServiceWorker = () => {
    return navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('Service-worker: Register success.');
            return registration;
        })
        .catch(err => {
            console.error('Service-worker: Register failed.', err);
        });
}

const requestPermission = () => {
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
        });
    }
}

const handleSaveClub = (clubUrl) => {
    const clubItem = getClubPromised(clubUrl);
    const saveButton = document.querySelector('.save-button');

    saveButton.addEventListener('click', () => {
        clubItem.then(club => {
            saveClub(club);
        })
    });
}

const handleDeleteClub = () => {
    document.addEventListener('click', element => {
        const deleteButton = element.target;
        if (deleteButton.classList.contains('remove-button')) {
            const keyPath = deleteButton.dataset.keypath;
            console.log(keyPath);
            deleteClub(keyPath);
        }
    })
}

const urlIdCorrection = urlHash => {
    return urlHash.replace('#', '');
}

const getLeagueInformation = (hash, url) => {
    const leagueId = urlIdCorrection(hash);
    renderLeague(url + leagueId + '/standings', url + leagueId + '/scorers');
}

const handleUrlChange = () => {
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
                const createSavedClubsElement = new SavedClubsPage();
                createSavedClubsElement.render();
                handleDeleteClub();
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

    // Handle get request
    handleUrlChange();
}

export default App;