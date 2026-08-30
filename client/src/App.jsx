import {
    useEffect,
    useLayoutEffect,
    useState,
} from "react";


import Header
    from "./sections/Header";

import Hero
    from "./sections/Hero";

import About
    from "./sections/About";

import Skills
    from "./sections/Skills";

import Projects
    from "./sections/Projects";

import Websites
    from "./sections/Websites";

import Experience
    from "./sections/Experience";

import Education
    from "./sections/Education";

import CTA
    from "./sections/CTA";

import Contact
    from "./sections/Contact";

import Footer
    from "./Footer";


function App() {

    /* =======================================================
       THEME
    ======================================================= */

    const [theme, setTheme] =
        useState(
            () =>
                localStorage.getItem(
                    "theme"
                ) || "dark"
        );


    /* =======================================================
       MOBILE MENU
    ======================================================= */

    const [menu, setMenu] =
        useState(false);


    /* =======================================================
       THEME EFFECT
    ======================================================= */

    useEffect(() => {

        document.documentElement.dataset.theme =
            theme;


        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);


    /* =======================================================
       SECTION SCROLL REVEAL
    ======================================================= */

    useLayoutEffect(() => {

        const root =
            document.documentElement;


        root.classList.add(
            "js-reveal-enabled"
        );


        const sections =
            document.querySelectorAll(
                "main .section"
            );


        if (!sections.length) {

            return () => {

                root.classList.remove(
                    "js-reveal-enabled"
                );

            };

        }


        if (
            !(
                "IntersectionObserver"
                in window
            )
        ) {

            sections.forEach(
                (section) => {

                    section.classList.add(
                        "is-visible"
                    );

                }
            );


            return () => {

                root.classList.remove(
                    "js-reveal-enabled"
                );

            };

        }


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "0px 0px -8% 0px",

                    threshold: 0.01,
                }
            );


        sections.forEach(
            (section) => {

                const rect =
                    section.getBoundingClientRect();


                const viewportHeight =
                    window.innerHeight ||
                    document.documentElement
                        .clientHeight;


                if (
                    rect.top <
                    viewportHeight * 0.92 &&
                    rect.bottom > 0
                ) {

                    section.classList.add(
                        "is-visible"
                    );


                    observer.unobserve(
                        section
                    );

                } else {

                    observer.observe(
                        section
                    );

                }

            }
        );


        return () => {

            observer.disconnect();


            root.classList.remove(
                "js-reveal-enabled"
            );

        };

    }, []);


    /* =======================================================
       RENDER
    ======================================================= */

    return (

        <>

            <Header
                menu={menu}
                setMenu={setMenu}
                theme={theme}
                setTheme={setTheme}
            />


            <main>

                <Hero />

                <About />

                <Skills />

                <Projects />

                <Websites />

                <Experience />

                <Education />

                <CTA />

                <Contact />

            </main>


            <Footer />

        </>

    );
}


export default App;