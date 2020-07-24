class LeaguePage {
    constructor(standingData, scorersData) {
        this._standingData = standingData;
        this._scorersData = scorersData;
        this.mainContainer = document.getElementById('main-content');
    }

    renderStandings() {
        let clubs = '';
        this._standingData.standings[0].table.forEach(club => {
            const logoUrl = club.team.crestUrl.replace(/^http:\/\//i, 'https://');
            clubs += `
                <tr>
                    <td>${club.position}</td>
                    <td>
                        <a class="club-link" href="#teams/${club.team.id}" title="${club.team.name} Profile">
                            <img class="standing-club-logo" src="${logoUrl}" alt="club-logo">
                            ${club.team.name}
                        </a>
                    </td>
                    <td>${club.playedGames}</td>
                    <td>${club.won}</td>
                    <td>${club.draw}</td>
                    <td>${club.lost}</td>
                    <td class="hide-on-small-only">${club.goalsFor}</td>
                    <td class="hide-on-small-only">${club.goalsAgainst}</td>
                    <td class="hide-on-small-only">${club.goalDifference}</td>
                    <td>${club.points}</td>
                </tr>
            `;
        });
        return clubs;
    }

    renderTopScorers() {
        let players = '';
        this._scorersData.scorers.forEach(player => {
            players += `
                <tr>
                    <td>${player.player.name}</td>
                    <td class="hide-on-small-only">${player.player.position}</td>
                    <td>${player.team.name}</td>
                    <td>${player.numberOfGoals}</td>
                </tr>
            `;
        });
        return players;
    }

    render() {
        // const mainContainer = document.getElementById('main-content');
        this.mainContainer.innerHTML = ``;
        this.mainContainer.innerHTML = 
        `
        <div class="row">
            <div class="col s12 header-league card blue-grey darken-3">
                <h5>${this._standingData.competition.name}</h5>
                <p>${this._standingData.competition.area.name}</p>
            </div>
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s6 blue-grey darken-3 waves-teal"><a class="active white-text" href="#standings">Standings</a></li>
                    <li class="tab col s6 blue-grey darken-3"><a class="white-text" href="#top-scorers">Top Scorers</a></li>
                </ul>
            </div>
            <div id="standings" class="col s12">
                <p>Last Updated: ${this._standingData.competition.lastUpdated}</p>
                <table class="highlight centered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Club</th>
                            <th class="hide-on-small-only">Played</th>
                            <th class="hide-on-small-only">Won</th>
                            <th class="hide-on-small-only">Draw</th>
                            <th class="hide-on-small-only">Lost</th>
                            <th class="hide-on-med-and-up">P</th>
                            <th class="hide-on-med-and-up">W</th>
                            <th class="hide-on-med-and-up">D</th>
                            <th class="hide-on-med-and-up">L</th>
                            <th class="hide-on-small-only">GF</th>
                            <th class="hide-on-small-only">GA</th>
                            <th class="hide-on-small-only">GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>${this.renderStandings()}</tbody>
                </table>
            </div>
            <div id="top-scorers" class="col s12">
                <p>Last Updated: ${this._scorersData.competition.lastUpdated}</p>
                <table class="highlight centered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="hide-on-small-only">Pos</th>
                            <th>Club</th>
                            <th>Goals</th>
                        </tr>
                    </thead>
                    <tbody>${this.renderTopScorers()}</tbody>
                </table>
            </div>
        </div>
        `;
        const tabs = document.querySelector('.tabs');
        M.Tabs.init(tabs, {
            swipeable: true
        });
    }
}

export default LeaguePage;