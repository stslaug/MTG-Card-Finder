function Footer() {
    return (
        <footer className = {"mx-auto text-white flex flex-row p-8"} id = "footer-wrapper">
            <p className = "mx-auto">Website developed by Sean Tyler Slaughter</p>

            <span className = "flex mx-auto flex-row gap-4">
                <a aria-label = "Click to go to Sean's LinkedIn" href = "https://linkedin.com/in/stslaug"><i className = "fa-brands fa-linkedin fa-xl"></i></a>
                <a aria-label = "Click to go to Sean's Github" href = "https://github.com/stslaug" target = "_blank"><i className = "fab fa-github fa-xl"></i></a>
                <a aria-label = "Click to go to Sean's Email" href = "mailto:site@seanslaughter.dev"><i className = "fa-solid fa-envelope fa-xl"></i></a>
		    </span>
        </footer>
    );
}

export {
    Footer
}
