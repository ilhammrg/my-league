class league {
    constructor(leagueData) {
        this.leagueData = leagueData;
    }

    render() {
        const mainContainer = document.getElementById('main-content');
        mainContainer.innerHTML = ``;
        mainContainer.innerHTML = 
        `
        <div class="row">
            <div class="col s12">
                <h5>${this.leagueData.name}</h5>
                <p>Area: ${this.leagueData.area.name}</p>
            </div>
            <div class="col s12">
                <ul class="tabs tabs-fixed-width">
                    <li class="tab col s6 grey lighten-4 waves-purple"><a class="active" href="#standings">Standings</a></li>
                    <li class="tab col s6 grey lighten-4 waves-purple"><a class="" href="#top-scorers">Top Scorers</a></li>
                </ul>
            </div>
            <div id="standings" class="col s12">
                <p>Last Updated: 2020-07-09T07:37:00Z</p>
                <table class="highlight centered">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Club</th>
                            <th>Played</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Chelsea</td>
                            <td>30</td>
                            <td>20</td>
                            <td>5</td>
                            <td>5</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>65</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Chelsea</td>
                            <td>30</td>
                            <td>20</td>
                            <td>5</td>
                            <td>5</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>65</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Chelsea</td>
                            <td>30</td>
                            <td>20</td>
                            <td>5</td>
                            <td>5</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>65</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="top-scorers" class="col s12">
                <p>Last Updated: 2020-07-09T07:37:00Z</p>
                <table class="highlight centered">
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Position</th>
                            <th>Club</th>
                            <th>Total Goals</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mohamed Salah</td>
                            <td>Attacker</td>
                            <td>Liverpool</td>
                            <td>19</td>
                        </tr>
                        <tr>
                            <td>Mohamed Salah</td>
                            <td>Attacker</td>
                            <td>Liverpool</td>
                            <td>19</td>
                        </tr>
                        <tr>
                            <td>Mohamed Salah</td>
                            <td>Attacker</td>
                            <td>Liverpool</td>
                            <td>19</td>
                        </tr>
                    </tbody>
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