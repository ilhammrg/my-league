import { createDB } from './services/database.js';
import { handleUrlChange } from './data-source/nav.js';
import Navbar from './components/navbar.component.js';
import Sidebar from './components/sidebar.component.js';
import Footer from './components/footer.component.js';
import HomePage from "./pages/home.page.js";

const App = () => {
    // Initiate database
    createDB();

    // Render App-shell
    Navbar();
    Sidebar();
    Footer();
    HomePage();

    // Handle user interaction
    handleUrlChange();
}

export default App;