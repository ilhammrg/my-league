import fallbackComponents from '../components/fallback.js';

const tokenAPI = '0d08af0570034b03a525c4af84529e5c';
const proxyNoCORS = 'https://cors-anywhere.herokuapp.com/';

const leagueApi = url => {
    return fetch(proxyNoCORS + url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': tokenAPI
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => fallbackComponents());
}

export default leagueApi;