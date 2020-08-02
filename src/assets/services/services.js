export async function registerServiceWorker() {
    return await navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('Service-worker: Register success.');
            return registration;
        })
        .catch(err => {
            console.error('Service-worker: Register failed.', err);
        });
}

export function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            switch(result) {
                case('granted'):
                    console.log('Notification: Allowed.');
                    break;
                case('denied'):
                    console.log('Notification: Disabled.');
                    break;
                case('default'):
                    console.log('Notification: Permission dialog closed.');
                    break;
            }

            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function(registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BFXCX6pO_bpGnDPHRpkiplZ_Z4cIlhL8iATRl-h1eIcmanviJqc9f-hVw7LfHxSs46IjJOIOKGVPLWyrKOimdfA")
                        }).then(function(subscribe) {
                            const subscription = {
                                endpoint: `${subscribe.endpoint}`,
                                p256dh: `${btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))}`,
                                auth: `${btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))}`
                            };
                            return console.log(subscription);
                        }).catch(function(e) {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    });
                }
            });
            
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}