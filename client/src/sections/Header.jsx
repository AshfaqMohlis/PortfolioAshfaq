import SiteLogo from "../components/SiteLogo";


function Header({
    menu,
    setMenu,
    theme,
    setTheme,
}) {

    const navItems = [
        "home",
        "about",
        "skills",
        "projects",
        "websites",
        "experience",
        "education",
        "contact",
    ];


    const closeMenu = () => {
        setMenu(false);
    };


    return (

        <header className="header">

            <div className="container nav">

                <a
                    className="logo"
                    href="/"
                    aria-label="Ashfaq Ahmad Home"
                >

                    <SiteLogo />

                </a>


                <button
                    className="menu-btn"
                    onClick={() =>
                        setMenu(!menu)
                    }
                    aria-label="Open menu"
                >
                    ☰
                </button>


                <nav
                    className={`nav-links ${menu ? "open" : ""
                        }`}
                >

                    {navItems.map((item) => (

                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={closeMenu}
                        >

                            {item[0].toUpperCase() +
                                item.slice(1)}

                        </a>

                    ))}

                </nav>


                <div className="nav-actions">

                    <button
                        className="theme-btn"
                        onClick={() =>
                            setTheme(
                                theme === "dark"
                                    ? "light"
                                    : "dark"
                            )
                        }
                    >

                        {theme === "dark"
                            ? "☀ Light"
                            : "☾ Dark"}

                    </button>


                    <a
                        className="nav-cta"
                        href="/assets/Ashfaq-Ahmad-CV.pdf"
                        download
                    >
                        Download CV
                    </a>

                </div>

            </div>

        </header>

    );
}


export default Header;