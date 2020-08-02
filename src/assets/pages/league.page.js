class LeaguePage {
    constructor(standingData, scorersData) {
        this._standingData = standingData;
        this._scorersData = scorersData;
        this.mainContainer = document.getElementById('main-content');
    }

    renderStandings() {
        let clubs = '';
        this._standingData.standings[0].table.forEach(club => {
            const { position, team, playedGames, won, draw, lost, goalsFor, goalsAgainst, goalDifference, points } = club;
            const logoUrl = team.crestUrl.replace(/^http:\/\//i, 'https://');
            clubs += `
                <tr>
                    <td>${position}</td>
                    <td>
                        <a class="club-link" href="#teams/${team.id}" title="${team.name} Profile">
                            <img class="standing-club-logo" src="${logoUrl}" alt="club-logo">
                            ${team.name}
                        </a>
                    </td>
                    <td>${playedGames}</td>
                    <td>${won}</td>
                    <td>${draw}</td>
                    <td>${lost}</td>
                    <td class="hide-on-small-only">${goalsFor}</td>
                    <td class="hide-on-small-only">${goalsAgainst}</td>
                    <td class="hide-on-small-only">${goalDifference}</td>
                    <td>${points}</td>
                </tr>
            `;
        });
        return clubs;
    }

    renderTopScorers() {
        let players = '';
        this._scorersData.scorers.forEach(scorer => {
            const { player, team, numberOfGoals  } = scorer;
            players += `
                <tr>
                    <td>${player.name}</td>
                    <td class="hide-on-small-only">${player.position}</td>
                    <td>${team.name}</td>
                    <td>${numberOfGoals}</td>
                </tr>
            `;
        });
        return players;
    }

    render() {
        const { name, area, lastUpdated } = this._standingData.competition;
        this.mainContainer.innerHTML = ``;
        this.mainContainer.innerHTML = 
        `
        <div class="row">
            <div class="col s12">
                <h5>${name}</h5>
                <p>${area.name}</p>
            </div>
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s6 grey darken-4 waves-teal"><a class="active white-text" href="#standings">Standings</a></li>
                    <li class="tab col s6 grey darken-4"><a class="white-text" href="#top-scorers">Top Scorers</a></li>
                </ul>
            </div>
            <div id="standings" class="col s12">
                <p>Last Updated: ${lastUpdated}</p>
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