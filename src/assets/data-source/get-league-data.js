import fallbackComponents from "../components/fallback.component";

const tokenAPI = '0d08af0570034b03a525c4af84529e5c';
const proxyNoCORS = 'https://cors-anywhere.herokuapp.com/';

const getLeagueData = url => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': tokenAPI
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => fallbackComponents());
}

export default getLeagueData;