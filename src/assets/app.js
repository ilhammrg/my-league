import { createDB } from './services/database.js';
import { registerServiceWorker, requestPermission } from './services/services.js';
import { handleUrlChange } from './data-source/nav.js';

const App = () => {
    // Register Service Worker
    if (!('serviceWorker' in navigator)) {
        console.error("This browser does not support Service Worker");
    } else {
        registerServiceWorker();
        requestPermission();
    }

    // Initiate database
    createDB();

    // Handle get request
    handleUrlChange();
}

export default App;