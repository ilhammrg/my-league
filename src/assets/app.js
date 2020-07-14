import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import PremierLeague from './components/premier-league.js';

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
    
    // Render main content
    const mainContainer = document.getElementById('main-content');

    document.body.addEventListener('click', event => {
        const navButton = event.target;
        if (navButton.classList.contains('premier-league')) {
            mainContainer.innerHTML = PremierLeague;
            const tabs = document.querySelector('.tabs');
            M.Tabs.init(tabs, {
                swipeable: true
            });
        } else if (navButton.classList.contains('primera-division')) {
            mainContainer.innerHTML = `<h5>Under construction.</h5>`;
        } else if (navButton.classList.contains('serie-a')) {
            mainContainer.innerHTML = `<h5>Under construction.</h5>`;
        } else if (navButton.classList.contains('home')) {
            mainContainer.innerHTML = `<h5>Under construction.</h5>`;
        }
        
    });
    
}

export default app;