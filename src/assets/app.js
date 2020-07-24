import { renderLeague, renderClub } from './data-source/league-render.js';
import { getClubPromised } from './data-source/league-api.js';
import { insertClub, deleteClub, createDB, getAllClubs } from './db/database.js';
import HomePage from './pages/home.page.js';
import SavedClubsPage from './pages/saved-clubs.page.js';

const baseUrl = 'https://api.football-data.org/v2/';

const registerServiceWorker = async () => {
    return await navigator.serviceWorker.register('./sw.js')
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

const handleSaveClub = clubUrl => {
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