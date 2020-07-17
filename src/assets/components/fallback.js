const fallbackComponents = () => {
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = ``;
    mainContainer.innerHTML = 
    `
        <div>
            <h5>Something wrong, comeback later.</h5>
        </div>
    `;
}

export default fallbackComponents;