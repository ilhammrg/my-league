class league {
    constructor(leagueData, standings, topScorers) {
        this.leagueData = leagueData;
        this.standings = standings;
        this.topScorers = topScorers;
    }

    renderStandings() {
        let clubs = '';
        this.standings.standings[0].table.forEach(club => {
            clubs += `
                <tr>
                    <td>${club.position}</td>
                    <td>
                        <span class="hide-on-small-only">
                           <a class="club-link" href="#teams/${club.team.id}" data-clubid="${club.team.id}">${club.team.name}</a>
                        </span>
                    </td>
                    <td>${club.playedGames}</td>
                    <td>${club.won}</td>
                    <td>${club.draw}</td>
                    <td>${club.lost}</td>
                    <td>${club.goalsFor}</td>
                    <td>${club.goalsAgainst}</td>
                    <td>${club.goalDifference}</td>
                    <td>${club.points}</td>
                </tr>
            `;
        });
        return clubs;
    }

    renderTopScorers() {
        let players = '';
        this.topScorers.scorers.forEach(player => {
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
        const mainContainer = document.getElementById('main-content');
        mainContainer.innerHTML = ``;
        mainContainer.innerHTML = 
        `
        <div class="row">
            <div class="col s12 header-league card grey lighten-5">
                <h5>${this.leagueData.name}</h5>
                <p>Area: ${this.leagueData.area.name}</p>
            </div>
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s6 grey lighten-4 waves-purple"><a class="active" href="#standings">Standings</a></li>
                    <li class="tab col s6 grey lighten-4 waves-purple"><a class="" href="#top-scorers">Top Scorers</a></li>
                </ul>
            </div>
            <div id="standings" class="col s12">
                <p>Last Updated: ${this.standings.competition.lastUpdated}</p>
                <table class="highlight striped centered">
                    <thead class="red-text text-lighten-2">
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
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>${this.renderStandings()}</tbody>
                </table>
            </div>
            <div id="top-scorers" class="col s12">
                <p>Last Updated: ${this.topScorers.competition.lastUpdated}</p>
                <table class="highlight striped centered">
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

export default league;