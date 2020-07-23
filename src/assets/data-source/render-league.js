import { getLeagueData } from './get-league-data.js';
import LeaguePage from '../pages/league.page.js';
import ClubPage from '../pages/club.page.js';
import Preloader from '../components/preloader.component.js';
import FallbackPage from '../pages/fallback.page.js';

// Fetch and render league component
const renderLeague = async (standingUrl, scorersUrl) => {
    try {
        Preloader();
        const standingData = await getLeagueData(standingUrl);
        const scorersData = await getLeagueData(scorersUrl);
        const createLeagueElement = new LeaguePage(standingData, scorersData);
        createLeagueElement.render();
    } catch {
        FallbackPage();
    }
}

// Fetch and render club component
const renderClub = async (clubUrl, clubId) => {
    try {
        Preloader();
        const clubData = await getLeagueData(clubUrl + clubId);
        const createClubElement = new ClubPage(clubData);
        createClubElement.render();
    } catch {
        FallbackPage();
    }
}

export { renderLeague, renderClub };