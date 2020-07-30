import HomePage from '../pages/home.page.js';
import { renderLeague, renderClub } from './league-render.js';
import { getSavedClubs, handleSaveClub } from '../services/database.js';

function urlIdCorrection(urlHash) {
    return urlHash.replace('#', '');
}

function getLeagueInformation(hash, url, token) {
    const leagueId = urlIdCorrection(hash);
    renderLeague(url + leagueId + '/standings', url + leagueId + '/scorers', token);
}

export function handleUrlChange() {
    window.addEventListener("hashchange", async () => {
        const baseUrl = 'https://api.football-data.org/v2/';
        const urlHash = window.location.hash;
        const tokenAPI = '0d08af0570034b03a525c4af84529e5c';
        switch(true) {
            case (urlHash.includes('competitions/2021')):
                getLeagueInformation(window.location.hash, baseUrl, tokenAPI)
                break;
            case (urlHash.includes('competitions/2014')):
                getLeagueInformation(window.location.hash, baseUrl, tokenAPI);
                break;
            case (urlHash.includes('competitions/2019')):
                getLeagueInformation(window.location.hash, baseUrl, tokenAPI);
                break;
            case (urlHash.includes('teams')):
                const clubID = urlIdCorrection(window.location.hash);
                await renderClub(baseUrl + clubID, tokenAPI);
                handleSaveClub(baseUrl + clubID, tokenAPI);
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