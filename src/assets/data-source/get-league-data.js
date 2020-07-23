import FallbackPage from "../pages/fallback.page.js";

const tokenAPI = '0d08af0570034b03a525c4af84529e5c';

const getLeagueData = async url => {
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
            'X-Auth-Token': tokenAPI
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => FallbackPage());
}

const getClubPromised = (url, clubId) => {
    return new Promise ((resolve, reject) => {
        if ('caches' in window) {
            caches.match(url+clubId)
                .then(response => {
                    if (response) {
                        resolve(response.json());
                    } else {
                        return;
                    }
                });
        }
        fetch(url+clubId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-Auth-Token': tokenAPI
            }
        })
        .then(response => response.json())
        .then(data => resolve(data))
    });
}

export {getLeagueData, getClubPromised};