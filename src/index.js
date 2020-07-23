import "regenerator-runtime";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "./assets/styles/style.css";
import Navbar from './assets/components/navbar.component.js';
import Sidebar from './assets/components/sidebar.component.js';
import Footer from './assets/components/footer.component.js';
import App from "./assets/app.js";
import HomePage from "./assets/components/home.component.js";

document.addEventListener('DOMContentLoaded', () => {
    Navbar();
    Sidebar();
    Footer();
    HomePage();
    App();
});