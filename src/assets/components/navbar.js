class Navbar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper container">
                    <a href="#" class="brand-logo"><img class="trophy-logo" src="assets/icons/icon-72x72.png" alt="trophy">My League</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="#premier-league">Premier League</a></li>
                        <li><a href="#primera-division">Primera Division</a></li>
                        <li><a href="#serie-a">Serie A</a></li>
                        <li><a href="#saved-teams">Saved Teams</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        `;
    }
}

customElements.define('nav-bar', Navbar);