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
                        <span>
                           <a class="club-link" href="#teams/${club.team.id}" title="${club.team.name}" data-clubid="${club.team.id}">${club.team.name}</a>
                        </span>
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
            <div class="col s12 header-league card blue-grey darken-3">
                <h5>${this.leagueData.name}</h5>
                <p>Area: ${this.leagueData.area.name}</p>
            </div>
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s6 blue-grey darken-3 waves-teal"><a class="active white-text" href="#standings">Standings</a></li>
                    <li class="tab col s6 blue-grey darken-3"><a class="white-text" href="#top-scorers">Top Scorers</a></li>
                </ul>
            </div>
            <div id="standings" class="col s12">
                <p>Last Updated: ${this.standings.competition.lastUpdated}</p>
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
                <p>Last Updated: ${this.topScorers.competition.lastUpdated}</p>
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

export default league;