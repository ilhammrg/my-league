const Preloader = () => {
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = ``;
    mainContainer.innerHTML = 
    `
        <div class="preloader-container">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export default Preloader;