const fallbackComponents = () => {
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = ``;
    mainContainer.innerHTML = 
    `
        <div class="center">
            <h6>You are offline or the request has reach the limit, comeback later.</h6>
        </div>
    `;
}

export default fallbackComponents;