function Hero() {

    return (

        <section
            id="home"
            className="hero"
        >

            <div className="container hero-grid">

                <div>

                    <p className="eyebrow">
                        MERN STACK DEVELOPER · WORDPRESS DEVELOPER
                    </p>


                    <h1>

                        Building modern web
                        experiences that{" "}

                        <span>
                            work beautifully.
                        </span>

                    </h1>


                    <p className="hero-text">

                        I'm Ashfaq Ahmad, a Computer Science
                        graduate and web developer focused on
                        React, Node.js, MongoDB, Express,
                        WordPress, Elementor and modern
                        frontend development.

                    </p>


                    <div className="hero-actions">

                        <a
                            className="btn primary"
                            href="#projects"
                        >
                            View My Work
                        </a>


                        <a
                            className="btn secondary"
                            href="/assets/Ashfaq-Ahmad-CV.pdf"
                            download
                        >
                            Download CV ↓
                        </a>

                    </div>


                    <div className="quick-info">

                        <span>
                            📍 Pakistan
                        </span>

                        <span>
                            💻 Open to opportunities
                        </span>

                        <span>
                            ⚡ MERN + WordPress
                        </span>

                    </div>

                </div>


                <div className="hero-card">

                    <div className="code-top">

                        <span></span>
                        <span></span>
                        <span></span>

                    </div>


                    <pre>

                        <code>

                            <i>const</i> developer = {"{"}

                            {"\n"} name: <b>"Ashfaq Ahmad"</b>,

                            {"\n"} role: <b>"MERN Developer"</b>,

                            {"\n"} frontend: [
                            <b>"HTML"</b>, <b>"CSS"</b>,

                            {"\n"} <b>"JavaScript"</b>, <b>"React"</b>],

                            {"\n"} backend: [
                            <b>"Node.js"</b>, <b>"Express"</b>],

                            {"\n"} database: <b>"MongoDB"</b>,

                            {"\n"} cms: <b>"WordPress"</b>,

                            {"\n"} focus:
                            <b>"Clean, scalable UI"</b>

                            {"\n"}{"}"};

                        </code>

                    </pre>

                </div>

            </div>

        </section>

    );
}


export default Hero;