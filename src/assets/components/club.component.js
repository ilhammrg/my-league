class ClubPage {
    constructor(clubData) {
        this._clubData = clubData;
    }

    renderSquads() {
        let squads = '';
        this._clubData.squad.forEach(player => {
            let { shirtNumber, name, position, nationality, role } = player;
            if (shirtNumber == null) shirtNumber = '-';
            if (position == null) position = role;
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
        const mainContainer = document.getElementById('main-content');
        const logoUrl = this._clubData.crestUrl.replace(/^http:\/\//i, 'https://');
        mainContainer.innerHTML = '';
        mainContainer.innerHTML = `
        <div class="row">
            <div class="col s12 m6 offset-m3 l4">
                <div class="card club-card blue-grey darken-3">
                    <div class="card-image">
                        <img class="club-logo" src="${logoUrl}" alt="club-logo">
                        <a id="save" class="save-button btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Save club">
                            <i class="material-icons">add</i>
                        </a>
                    </div>
                    <div class="card-content">
                        <h5>${this._clubData.name}</h5>
                        <div>
                            <i class="material-icons">view_list</i>
                            <span>${this._clubData.activeCompetitions[0].name}</span>
                        </div>
                        <div>
                            <i class="material-icons">home</i>
                            <span>${this._clubData.venue}</span>
                        </div>
                        <div>
                            <i class="material-icons">link</i>
                            <a href="${this._clubData.website}" target="_blank">${this._clubData.website}</a>
                        </div>
                    </div>
                    <div class="card-action">
                        <span>Last Updated: ${this._clubData.lastUpdated}</span>
                    </div>
                </div>
            </div>
            <div class="col s12 l8 squad-card blue-grey darken-3">
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