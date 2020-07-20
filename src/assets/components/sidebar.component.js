const Sidebar = () => {
    const sidebar = document.querySelector('.sidenav');
    sidebar.innerHTML = `
        <li class="home">
            <a class="home waves-effect waves-light sidenav-close white-text" href="#home" title="Home">
                <i class="home material-icons left white-text">home</i>
                <span class="home">Home</span>
            </a>
        </li>
        <li class="premier-league">
            <a class="premier-league waves-effect waves-light sidenav-close white-text" href="#premier-league" title="Premier League">
                <i class="premier-league material-icons left white-text">view_list</i>
                <span class="premier-league">Premier League</span>
            </a>
        </li>
        <li class="primera-division">
            <a class="primera-division waves-effect waves-light sidenav-close white-text" href="#primera-division" title="Primera Division">
                <i class="primera-division material-icons left white-text">view_list</i>
                <span class="primera-division">Primera Division</span>
            </a>
            </li>
        <li class="serie-a">
            <a class="serie-a waves-effect waves-light sidenav-close white-text" href="#serie-a" title="Serie A">
                <i class="serie-a material-icons left white-text">view_list</i>
                <span class="serie-a">Serie A</span>
            </a>
        </li>
        <li class="saved-clubs">
            <a class="saved-clubs waves-effect waves-light sidenav-close white-text" href="#saved-clubs" title="Saved Clubs">
                <i class="saved-clubs material-icons left white-text">bookmark</i>
                <span class="saved-clubs">Saved Clubs</span>
            </a>
        </li>
    `;
    M.Sidenav.init(sidebar);
}

export default Sidebar;