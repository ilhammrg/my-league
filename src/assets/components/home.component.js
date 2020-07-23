const HomePage = () => {
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';
    mainContainer.innerHTML = `
    <div class="home-container">
        <div class="row">
            <div class="col s12 m6">
                <div class="card hoverable home-nav-container red lighten-2">
                    <div class="card-image">
                        <a 
                            class="premier-league home-nav-button" 
                            href="#premier-league"
                            style="background-image: url('https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg');"
                            title="Premier League"
                        >      
                        </a>
                    </div>
                </div>
            </div>
            <div class="col s12 m6">
                <div class="card hoverable home-nav-container yellow lighten-3">
                    <div class="card-image">
                        <a 
                            class="primera-division home-nav-button"
                            href="#primera-division"
                            style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/13/LaLiga.svg');"
                            title="Primera Division"
                        >
                        </a>
                    </div>
                </div>
            </div>
            <div class="col s12 m6">
                <div class="card hoverable home-nav-container teal">
                    <div class="card-image">
                        <a 
                            class="serie-a home-nav-button"
                            href="#serie-a"
                            style="background-image: url('https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg');"
                            title="Serie A"
                        >
                        </a>
                    </div>
                </div>
            </div>
            <div class="col s12 m6">
                <div class="card hoverable home-nav-container cyan">
                    <div class="card-image">
                        <a 
                            class="saved-clubs home-nav-button"
                            href="#saved-clubs"
                            title="Saved Clubs"
                        >
                            <i class="material-icons">bookmark</i>
                            <span class="card-title">Saved Clubs</span>    
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export default HomePage;