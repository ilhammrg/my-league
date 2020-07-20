const Navbar = () => {
    const navbarContainer = document.getElementById('nav-container');
    navbarContainer.innerHTML = `
        <div class="navbar-fixed">
            <nav class="blue-grey darken-3">
                <div class="nav-wrapper container">
                    <a href="#home" class="home brand-logo left hide-on-med-and-down">
                        <img class="trophy-logo" src="assets/icons/icon-72x72.png" alt="trophy">
                        <span>My League</span>
                    </a>
                    <a href="#home" class="home brand-logo hide-on-large-only">
                        <img class="trophy-logo" src="assets/icons/icon-72x72.png" alt="trophy">
                        <span>My League</span></a>
                    <a class="sidenav-trigger hide-on-large-only left" data-target="menu-side" href="#">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li>
                            <a class="premier-league waves-effect waves-light" href="#premier-league" title="Premier League">Premier League</a>
                        </li>
                        <li>
                            <a class="primera-division waves-effect waves-light" href="#primera-division" title="Primera Division">Primera Division</a>
                        </li>
                        <li>
                            <a class="serie-a waves-effect waves-light" href="#serie-a" title="Serie A">Serie A</a>
                        </li>
                        <li>
                            <a class="saved-clubs waves-effect waves-light" href="#saved-clubs" title="Saved Clubs">Saved Clubs</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    `;
}

export default Navbar;