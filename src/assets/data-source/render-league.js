import { getLeagueData } from './get-league-data.js';
import league from '../components/league.component.js';
import club from '../components/club.component.js';
import preloader from '../components/preloader.component.js';
import fallbackComponents from '../components/fallback.component.js';

// Fetch and render league component
const renderLeague = async (standingUrl, scorersUrl) => {
    try {
        preloader();
        const standingData = await getLeagueData(standingUrl);
        const scorersData = await getLeagueData(scorersUrl);
        const createLeagueElement = new league(standingData, scorersData);
        createLeagueElement.render();
    } catch {
        fallbackComponents();
    }
}

// Fetch and render club component
const renderClub = async (clubUrl, clubId) => {
    try {
        preloader();
        const clubData = await getLeagueData(clubUrl + clubId);
        const createClubElement = new club(clubData);
        createClubElement.render();
    } catch {
        fallbackComponents();
    }
}

export { renderLeague, renderClub };