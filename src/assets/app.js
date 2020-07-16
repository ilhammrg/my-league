import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import league from './components/league.js';
import leagueApi from './api/league-api.js';
import urls from './api/urls.js';

const app = () => {
    const registerServiceWorker = () => {
        return navigator.serviceWorker.register('./sw.bundle.js')
            .then(registration => {
                console.log('Service-worker: Register success.');
                return registration;
            })
            .catch(err => {
                console.error('Service-worker: Register failed.', err);
            });
    }

    // Register Service Worker
    if (!('serviceWorker' in navigator)) {
        console.error("This browser does not support Service Worker");
    } else {
        registerServiceWorker();
    }

    
    // Render Navbar
    const navbarContainer = document.getElementById('nav-container');
    navbarContainer.innerHTML = Navbar;

    // Render Sidebar
    const sidebar = document.querySelector('.sidenav');
    sidebar.innerHTML = Sidebar;
    M.Sidenav.init(sidebar);

    // Render Footer
    const footerContainer = document.querySelector('.page-footer');
    footerContainer.innerHTML = Footer;

    // Get league data
    const premierLeagueBtnClicked = async () => {
        const leagueData = await leagueApi(urls.premierLeague.general);
        const standings = await leagueApi(urls.premierLeague.standings);
        const topScorers = await leagueApi(urls.premierLeague.topScorers);
        const premierLeague = new league(leagueData, standings, topScorers);
        premierLeague.render();
    }

    const primeraDivisionBtnClicked = async () => {
        const leagueData = await leagueApi(urls.primeraDivision.general);
        const standings = await leagueApi(urls.primeraDivision.standings);
        const topScorers = await leagueApi(urls.primeraDivision.topScorers);
        const primeraDivision = new league(leagueData, standings, topScorers);
        primeraDivision.render();
    }

    const serieABtnClicked = async () => {
        const leagueData = await leagueApi(urls.serieA.general);
        const standings = await leagueApi(urls.serieA.standings);
        const topScorers = await leagueApi(urls.serieA.topScorers);
        const serieA = new league(leagueData, standings, topScorers);
        serieA.render();
    }
    
    // Render main content
    document.body.addEventListener('click', event => {
        const navButton = event.target;
        if (navButton.classList.contains('premier-league')) {
            premierLeagueBtnClicked(); 
        } else if (navButton.classList.contains('primera-division')) {
            primeraDivisionBtnClicked();
        } else if (navButton.classList.contains('serie-a')) {
            serieABtnClicked();
        } else if (navButton.classList.contains('home')) {

        } else if (navButton.classList.contains('saved-teams')) {

        }
        
    });
    
}

export default app;