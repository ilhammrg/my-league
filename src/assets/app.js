import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import { getPremierLeague, getPrimeraDivision, getSerieA, getClubData } from './data-source/data-source.js';

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

    // Button event listener
    const buttonClicked = () => {
        document.body.addEventListener('click', event => {
            const button = event.target;
            if (button.classList.contains('premier-league')) {
                getPremierLeague(); 
            } else if (button.classList.contains('primera-division')) {
                getPrimeraDivision();
            } else if (button.classList.contains('serie-a')) {
                getSerieA();
            } else if (button.classList.contains('home')) {
                console.log('home');
            } else if (button.classList.contains('saved-clubs')) {
                console.log('saved-clubs');
            } else if (button.classList.contains('club-link')) {
                const clubID = button.dataset.clubid;
                getClubData(clubID);
            }
        });
    }
    
    // Window url location event listener
    const urlChange = () => {
        window.addEventListener("hashchange", () => {
            const urlHash = window.location.hash;
            if (urlHash.includes('premier-league')) {
                getPremierLeague();
            } else if (urlHash.includes('primera-division')) {
                getPrimeraDivision();
            } else if (urlHash.includes('serie-a')) {
                getSerieA();
            } else if (urlHash.includes('teams')) {
                const clubID = window.location.hash.replace('#teams/', '');
                getClubData(clubID);
            } else if (urlHash.includes('home')) {
                console.log('home');
            } else if (urlHash.includes('saved-clubs')) {
                console.log('saved-clubs')
            }
        });
    }

    // Render main content
    urlChange();
    buttonClicked();
}

export default app;