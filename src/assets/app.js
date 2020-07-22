import urls from './data-source/urls.js';
import { renderLeague, renderClub } from './data-source/render-league.js';
import Home from './components/home.component.js';

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

const renderPremierLeague = () => {
    renderLeague(
        premierLeague.standings, 
        premierLeague.topScorers
    );
}

const renderPrimeraDivision = () => {
    renderLeague(
        primeraDivision.standings,
        primeraDivision.topScorers
    );
}

const renderSerieA = () => {
    renderLeague(
        serieA.standings,
        serieA.topScorers
    );
}

const handleUrlChange = () => {
    window.addEventListener("hashchange", () => {
        const urlHash = window.location.hash;
        if (urlHash.includes('premier-league')) {
            renderPremierLeague();
        } else if (urlHash.includes('primera-division')) {
            renderPrimeraDivision();
        } else if (urlHash.includes('serie-a')) {
            renderSerieA();
        } else if (urlHash.includes('teams')) {
            const clubID = window.location.hash.replace('#teams/', '');
            renderClub(urls.club, clubID);
        } else if (urlHash.includes('home')) {
            Home();
        } else if (urlHash.includes('saved-clubs')) {
            console.log('saved-clubs')
        }
    });
}

const App = () => {

    // Register Service Worker
    if (!('serviceWorker' in navigator)) {
        console.error("This browser does not support Service Worker");
    } else {
        registerServiceWorker();
    }

    // Handle get request
    handleUrlChange();
}

export default App;