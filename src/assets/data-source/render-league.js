import { getLeagueData } from './get-league-data.js';
import LeaguePage from '../components/league.component.js';
import ClubPage from '../components/club.component.js';
import preloader from '../components/preloader.component.js';
import FallbackPage from '../components/fallback.component.js';

// Fetch and render league component
const renderLeague = async (standingUrl, scorersUrl) => {
    try {
        preloader();
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
        preloader();
        const clubData = await getLeagueData(clubUrl + clubId);
        const createClubElement = new ClubPage(clubData);
        createClubElement.render();
    } catch {
        FallbackPage();
    }
}

export { renderLeague, renderClub };