const leagueApi = url => {
    return fetch(`${url}`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '0d08af0570034b03a525c4af84529e5c'
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = '';
            mainContent.innerHTML = `<h5>Something wrong, comeback later.</h5>`;
            console.log("Can't get data", error);
    });
}

export default leagueApi;