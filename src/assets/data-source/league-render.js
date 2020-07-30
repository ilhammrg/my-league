import { getLeagueData } from './league-api.js';
import LeaguePage from '../pages/league.page.js';
import ClubPage from '../pages/club.page.js';
import Preloader from '../components/preloader.component.js';
import FallbackPage from '../pages/fallback.page.js';

// Fetch and render league page
export const renderLeague = async (standingUrl, scorersUrl, token) => {
    try {
        Preloader();
        const standingData = await getLeagueData(standingUrl, token);
        const scorersData = await getLeagueData(scorersUrl, token);
        const createLeagueElement = new LeaguePage(standingData, scorersData);
        createLeagueElement.render();
    } catch {
        FallbackPage();
    }
}

// Fetch and render club page
export const renderClub = async (clubUrl, token) => {
    try {
        Preloader();
        const clubData = await getLeagueData(clubUrl, token);
        const createClubElement = new ClubPage(clubData);
        createClubElement.render();
    } catch {
        FallbackPage();
    }
}