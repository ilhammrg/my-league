import FallbackPage from "../pages/fallback.page.js";

export const getLeagueData = async (url, token) => {
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