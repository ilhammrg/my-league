class SavedClubsPage {
    constructor() {
        this.mainContainer = document.getElementById('main-content');
    }

    render(clubs) {
        let savedClubsElement = '';
        clubs.forEach(club => {
            const logoUrl = club.crestUrl.replace(/^http:\/\//i, 'https://');
            savedClubsElement += `
            <div class="col s12 m6 l4 saved-club-container">
                <div class="card hoverable saved-club-card blue-grey darken-3">
                    <a 
                    class="saved-detail-button" 
                    href="#teams/${club.id}"
                    style="background-image: url('${logoUrl}');"
                    title="View ${club.shortName} details"
                    >      
                    </a>
                    <a class="btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Remove club">
                        <i class="remove-button material-icons" data-keypath="${club.id}">delete</i>
                    </a>
                </div>
            </div>
            `;
        });
        this.mainContainer.innerHTML = '';
        this.mainContainer.innerHTML = `
            <div class="row">${savedClubsElement}</div>
        `;
    }

    renderEmpty() {
        this.mainContainer.innerHTML = '';
        this.mainContainer.innerHTML = `
        <div class="center">
            <h6>No saved clubs yet.</h6>
        </div>
        `;
    }
}

export default SavedClubsPage;