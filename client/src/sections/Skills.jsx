import { skills } from "../data/portfolioData";


function Skills() {

    return (

        <section
            id="skills"
            className="section alt"
        >

            <div className="container">

                <p className="eyebrow">
                    02 — SKILLS
                </p>


                <h2>
                    Technical toolkit
                </h2>


                <div className="skills-grid">

                    {skills.map(
                        ([title, text]) => (

                            <article
                                key={title}
                            >

                                <h3>
                                    {title}
                                </h3>

                                <p>
                                    {text}
                                </p>

                            </article>

                        )
                    )}

                </div>

            </div>

        </section>

    );
}


export default Skills;