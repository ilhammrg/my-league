import Navbar from './components/navbar.js';
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
    
    // Render main content
    const mainContainer = document.getElementById('main-content');
    const buttonPremierLeague = document.getElementById('premier-league');

    buttonPremierLeague.addEventListener('click', () => {
        mainContainer.innerHTML = PremierLeague;
    });

}

export default app;