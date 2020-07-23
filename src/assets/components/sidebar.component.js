const Sidebar = () => {
    const sidebar = document.querySelector('.sidenav');
    sidebar.innerHTML = `
        <li>
            <a class="waves-effect waves-light sidenav-close white-text" href="#home" title="Home">
                <i class="material-icons left white-text">home</i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a class="waves-effect waves-light sidenav-close white-text" href="#competitions/2021" title="Premier League">
                <i class="material-icons left white-text">view_list</i>
                <span>Premier League</span>
            </a>
        </li>
        <li>
            <a class="waves-effect waves-light sidenav-close white-text" href="#competitions/2014" title="Primera Division">
                <i class="material-icons left white-text">view_list</i>
                <span>Primera Division</span>
            </a>
            </li>
        <li>
            <a class="waves-effect waves-light sidenav-close white-text" href="#competitions/2019" title="Serie A">
                <i class="material-icons left white-text">view_list</i>
                <span>Serie A</span>
            </a>
        </li>
        <li>
            <a class="waves-effect waves-light sidenav-close white-text" href="#saved-clubs" title="Saved Clubs">
                <i class="material-icons left white-text">bookmark</i>
                <span>Saved Clubs</span>
            </a>
        </li>
    `;
    M.Sidenav.init(sidebar);
}

export default Sidebar;