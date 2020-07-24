const FallbackPage = () => {
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = ``;
    mainContainer.innerHTML = 
    `   <div class="row">
            <div class="center col s12">
                <h6>You are offline or the request has reach the limit, come back later.</h6>
            </div>
        </div>
    `;
}

export default FallbackPage;