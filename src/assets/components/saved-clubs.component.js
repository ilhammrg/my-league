const SavedClubsPage = () => {
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';
    mainContainer.innerHTML = `
        <div class="row">
            <div class="col s12 m6 l4 saved-club-container">
                <div class="card hoverable saved-club-card blue-grey darken-3">
                    <a 
                    class="saved-detail-button" 
                    href="#teams/100"
                    style="background-image: url('https://upload.wikimedia.org/wikipedia/de/0/0e/AS_Roma_Logo_2017.svg');"
                    title="View club details"
                    >      
                    </a>
                    <a class="remove-button btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Remove club">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </div>
            <div class="col s12 m6 l4 saved-club-container">
                <div class="card hoverable saved-club-card blue-grey darken-3">
                    <a 
                    class="saved-detail-button" 
                    href="#teams/100"
                    style="background-image: url('https://upload.wikimedia.org/wikipedia/de/0/0e/AS_Roma_Logo_2017.svg');"
                    title="View club details"
                    >      
                    </a>
                    <a class="remove-button btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Remove club">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </div>
            <div class="col s12 m6 l4 saved-club-container">
                <div class="card hoverable saved-club-card blue-grey darken-3">
                    <a 
                    class="saved-detail-button" 
                    href="#teams/100"
                    style="background-image: url('https://upload.wikimedia.org/wikipedia/de/0/0e/AS_Roma_Logo_2017.svg');"
                    title="View club details"
                    >      
                    </a>
                    <a class="remove-button btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Remove club">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </div>
            <div class="col s12 m6 l4 saved-club-container">
                <div class="card hoverable saved-club-card blue-grey darken-3">
                    <a 
                    class="saved-detail-button" 
                    href="#teams/100"
                    style="background-image: url('https://upload.wikimedia.org/wikipedia/de/0/0e/AS_Roma_Logo_2017.svg');"
                    title="View club details"
                    >      
                    </a>
                    <a class="remove-button btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Remove club">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

export default SavedClubsPage;