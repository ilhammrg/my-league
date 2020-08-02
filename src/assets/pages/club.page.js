class ClubPage {
    constructor(clubData) {
        this._clubData = clubData;
        this.mainContainer = document.getElementById('main-content');
    }

    renderSquads() {
        let squads = '';
        this._clubData.squad.forEach(player => {
            let { shirtNumber, name, position, nationality } = player;
            shirtNumber = (shirtNumber === null) ? '-' : shirtNumber;
            position = (position === null) ? 'Coach' : position;
            squads += `
            <tr>
                <td>${shirtNumber}</td>
                <td>${name}</td>
                <td>${position}</td>
                <td>${nationality}</td>
            </tr>
            `;
        });
        return squads;
    }

    render() {
        const { name, activeCompetitions, venue, website, lastUpdated, crestUrl } = this._clubData;
        const logoUrl = crestUrl.replace(/^http:\/\//i, 'https://');
        this.mainContainer.innerHTML = '';
        this.mainContainer.innerHTML = `
        <div class="row">
            <div class="col s12 m6 offset-m3 l4">
                <div class="card club-card grey darken-4">
                    <div class="card-image">
                        <img class="club-logo" src="${logoUrl}" alt="club-logo">
                        <a id="save" class="save-button btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Save club">
                            <i class="material-icons">add</i>
                        </a>
                    </div>
                    <div class="card-content">
                        <h5>${name}</h5>
                        <div>
                            <i class="material-icons">view_list</i>
                            <span>${activeCompetitions[0].name}</span>
                        </div>
                        <div>
                            <i class="material-icons">home</i>
                            <span>${venue}</span>
                        </div>
                        <div>
                            <i class="material-icons">link</i>
                            <a href="${website}" target="_blank" rel="noreferrer">${website}</a>
                        </div>
                    </div>
                    <div class="card-action">
                        <span>Last Updated: ${lastUpdated}</span>
                    </div>
                </div>
            </div>
            <div class="col s12 l8 squad-card grey darken-4">
                <h5 class="center">Squads</h5>
                <table class="highlight centered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Pos</th>
                            <th>Nat</th>
                        </tr>
                    </thead>
                    <tbody>${this.renderSquads()}</tbody>
                </table>
            </div>
        </div>
        `;
    }
}

export default ClubPage;