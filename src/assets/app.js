import urls from './data-source/urls.js';
import { renderLeague, renderClub } from './data-source/render-league.js';
import { getClubPromised } from './data-source/get-league-data.js';
import saveClub from './db/db.js';
import HomePage from './components/home.component.js';
import SavedClubsPage from './components/saved-clubs.component.js';

const { premierLeague, primeraDivision, serieA } = urls;

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

const getPremierLeagueData = () => {
    renderLeague(
        premierLeague.standings, 
        premierLeague.topScorers
    );
}

const getPrimeraDivisionData = () => {
    renderLeague(
        primeraDivision.standings,
        primeraDivision.topScorers
    );
}

const getSerieAData = () => {
    renderLeague(
        serieA.standings,
        serieA.topScorers
    );
}

const handleSaveClub = (clubID) => {
    const clubItem = getClubPromised(urls.club, clubID);
    const saveButton = document.querySelector('.save-button');

    saveButton.addEventListener('click', () => {
        clubItem.then(club => {
            saveClub(club);
        })
    });
}

const handleUrlChange = () => {
    window.addEventListener("hashchange", async () => {
        const urlHash = window.location.hash;
        if (urlHash.includes('premier-league')) {
            getPremierLeagueData();
        } else if (urlHash.includes('primera-division')) {
            getPrimeraDivisionData();
        } else if (urlHash.includes('serie-a')) {
            getSerieAData();
        } else if (urlHash.includes('teams')) {
            const clubID = window.location.hash.replace('#teams/', '');
            await renderClub(urls.club, clubID);
            handleSaveClub(clubID);
        } else if (urlHash.includes('home')) {
            HomePage();
        } else if (urlHash.includes('saved-clubs')) {
            SavedClubsPage();
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