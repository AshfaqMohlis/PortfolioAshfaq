import SiteLogo from "./components/SiteLogo";


function Footer() {

    return (

        <footer>

            <div className="container footer">

                <a
                    className="footer-logo"
                    href="/"
                    aria-label="Ashfaq Ahmad Home"
                >

                    <SiteLogo />

                </a>


                <p>
                    © 2026 Ashfaq Ahmad.
                    Built with React,
                    Node.js & Express.
                </p>


                <a href="/">
                    Back to top ↑
                </a>

            </div>

        </footer>

    );
}


export default Footer;