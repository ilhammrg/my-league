import fallbackComponents from "../components/fallback.component";

const tokenAPI = '0d08af0570034b03a525c4af84529e5c';
const proxyNoCORS = 'https://cors-anywhere.herokuapp.com/';

const getLeagueData = url => {
    // if ('caches' in window) {
    //     caches.match(url)
    //     .then(response => {
    //         if (response) {
    //             response.json()
    //             .then(data => data)
    //         }
    //     })
    // }
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': tokenAPI
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => fallbackComponents());
}

export default getLeagueData;