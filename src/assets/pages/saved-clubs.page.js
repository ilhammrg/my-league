class SavedClubsPage {
    constructor() {
        this.mainContainer = document.getElementById('main-content');
    }

    render(clubs) {
        let savedClubsElement = '';
        clubs.forEach(club => {
            const { id, shortName, crestUrl } = club;
            const logoUrl = crestUrl.replace(/^http:\/\//i, 'https://');
            savedClubsElement += `
            <div class="col s12 m6 l4 saved-club-container">
                <div class="card hoverable saved-club-card grey darken-4">
                    <a 
                    class="saved-detail-button" 
                    href="#teams/${id}"
                    style="background-image: url('${logoUrl}');"
                    title="View ${shortName} details"
                    >      
                    </a>
                    <a class="btn-floating halfway-fab waves-effect waves-light cyan darken-1" title="Remove club">
                        <i class="remove-button material-icons" data-keypath="${id}" data-shortname="${shortName}">delete</i>
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
        <div class="row">
            <div class="center col s12">
                <h6>No saved clubs yet.</h6>
            </div>
        </div>
        `;
    }
}

export default SavedClubsPage;