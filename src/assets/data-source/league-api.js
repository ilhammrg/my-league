import FallbackPage from "../pages/fallback.page.js";

export const getLeagueData = async (url, token) => {
    if ('caches' in window) {
        await caches.match(url)
            .then(response => {
                if (response) {
                    return response.json();
                } else {
                    return;
                }
            });
    }
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': token
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => FallbackPage());
}

export const getClubPromised = (url, token) => {
    return new Promise ((resolve, reject) => {
        if ('caches' in window) {
            caches.match(url)
                .then(response => {
                    if (response) {
                        resolve(response.json());
                    } else {
                        return;
                    }
                });
        }
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-Auth-Token': token
            }
        })
        .then(response => response.json())
        .then(data => resolve(data))
    });
}