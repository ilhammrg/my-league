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

    if (!('serviceWorker' in navigator)) {
        console.error("This browser does not support Service Worker");
    } else {
        registerServiceWorker();
    }
}

export default app;