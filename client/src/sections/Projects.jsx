import { projects } from "../data/portfolioData";


function Projects() {

    return (

        <section
            id="projects"
            className="section"
        >

            <div className="container">

                <p className="eyebrow">
                    03 — PROJECTS
                </p>


                <h2>
                    Selected work
                </h2>


                <div className="projects-grid">

                    {projects.map(
                        (
                            [
                                number,
                                title,
                                description,
                                tech,
                            ]
                        ) => (

                            <article
                                className="website-project"
                                key={number}
                            >

                                <div className="website-project-content">

                                    <div className="website-project-number">

                                        <span>
                                            {number}
                                        </span>

                                        <span className="website-type">
                                            PROJECT
                                        </span>

                                    </div>


                                    <h3>
                                        {title}
                                    </h3>


                                    <p>
                                        {description}
                                    </p>


                                    <div className="website-project-footer">

                                        <span className="project-tech">
                                            {tech}
                                        </span>

                                        <span className="project-arrow">
                                            ↗
                                        </span>

                                    </div>

                                </div>

                            </article>

                        )
                    )}

                </div>

            </div>

        </section>

    );
}


export default Projects;