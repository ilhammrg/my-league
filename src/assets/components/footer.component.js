const Footer = () => {
    const footerContainer = document.querySelector('.page-footer');
    footerContainer.innerHTML = `
        <div class="container center">
            <span>Made with </span>
            <i class="tiny material-icons heart-icon">favorite</i>
            <span> in Bandung.</span>
            <a class="cyan-text text-lighten-4" href="https://github.com/ilhammrg/my-league" target="_blank" title="GitHub">Source Code</a>             
        </div>
    `;
}

export default Footer;