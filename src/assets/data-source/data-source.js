import urls from './urls.js';
import leagueApi from './league-api.js';
import league from '../components/league.js';
import club from '../components/club.js';
import preloader from '../components/preloader.js';
import fallbackComponents from '../components/fallback.js';

// Get league data
const getPremierLeague = async () => {
    try {
        preloader();
        const leagueData = await leagueApi(urls.premierLeague.general);
        const standings = await leagueApi(urls.premierLeague.standings);
        const topScorers = await leagueApi(urls.premierLeague.topScorers);
        const premierLeague = new league(leagueData, standings, topScorers);
        premierLeague.render();
    } catch {
        fallbackComponents();
    }
}

const getPrimeraDivision = async () => {
    try {
        preloader();
        const leagueData = await leagueApi(urls.primeraDivision.general);
        const standings = await leagueApi(urls.primeraDivision.standings);
        const topScorers = await leagueApi(urls.primeraDivision.topScorers);
        const primeraDivision = new league(leagueData, standings, topScorers);
        primeraDivision.render();
    } catch {
        fallbackComponents();
    }
}

const getSerieA = async () => {
    try {
        preloader();
        const leagueData = await leagueApi(urls.serieA.general);
        const standings = await leagueApi(urls.serieA.standings);
        const topScorers = await leagueApi(urls.serieA.topScorers);
        const serieA = new league(leagueData, standings, topScorers);
        serieA.render();
    } catch {
        fallbackComponents();
    }
}

// Get club data
const getClubData = async (clubId) => {
    try {
        preloader();
        const clubData = await leagueApi(`${urls.club}${clubId}`);
        const clubElement = new club(clubData);
        clubElement.render();
    } catch {
        fallbackComponents();
    }
}

export { getPremierLeague, getPrimeraDivision, getSerieA, getClubData };