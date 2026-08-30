function MERNShowcase() {

    return (

        <section className="mern-showcase">

            <div className="container">

                <div className="mern-showcase-grid">

                    {/* LEFT CONTENT */}

                    <div className="mern-showcase-content">

                        <span className="mern-showcase-number">
                            01
                        </span>


                        <p className="eyebrow">
                            MERN STACK PROJECT
                        </p>


                        <h2>
                            Blinkeyit
                            <span>
                                {" "}
                                E-Commerce App
                            </span>
                        </h2>


                        <p className="mern-showcase-description">

                            A full-stack MERN e-commerce
                            application built with React,
                            Node.js, Express and MongoDB.
                            The application includes
                            authentication, product management,
                            shopping cart, orders, payments
                            and a responsive modern interface.

                        </p>


                        <div className="mern-showcase-tech">

                            <span>React</span>
                            <span>Node.js</span>
                            <span>Express.js</span>
                            <span>MongoDB</span>
                            <span>Mongoose</span>
                            <span>Redux</span>
                            <span>JWT</span>
                            <span>Stripe</span>

                        </div>


                        <div className="mern-showcase-actions">

                            <a
                                href="https://blinkeyit-3wtn.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn primary"
                            >

                                View Live Project

                                <span className="mern-btn-arrow">
                                    ↗
                                </span>

                            </a>


                            <span className="mern-showcase-label">
                                FULL STACK • MERN
                            </span>

                        </div>

                    </div>


                    {/* RIGHT CARD */}

                    <div className="mern-showcase-card-wrapper">

                        <div className="mern-showcase-glow"></div>


                        <div className="mern-showcase-card">

                            {/* Browser Header */}

                            <div className="mern-card-top">

                                <div className="mern-card-dots">

                                    <span></span>
                                    <span></span>
                                    <span></span>

                                </div>


                                <span className="mern-card-url">
                                    blinkeyit-3wtn.vercel.app
                                </span>


                                <span className="mern-card-status">
                                    LIVE
                                </span>

                            </div>


                            {/* PDF PREVIEW */}

                            <div className="mern-project-preview">

                                <iframe
                                    src="/assets/images/blinkeyit-3wtn.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                                    title="Blinkeyit MERN E-Commerce Project Preview"
                                    className="mern-project-pdf"
                                    loading="lazy"
                                />


                                <div className="mern-project-overlay">

                                    <span>
                                        MERN E-COMMERCE
                                    </span>

                                    <strong>
                                        Blinkeyit
                                    </strong>

                                </div>

                            </div>


                            {/* FOOTER */}

                            <div className="mern-card-footer">

                                <div className="mern-card-info">

                                    <span>
                                        PROJECT
                                    </span>

                                    <strong>
                                        Full Stack E-Commerce
                                    </strong>

                                </div>


                                <a
                                    href="https://blinkeyit-3wtn.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open Blinkeyit project"
                                >
                                    ↗
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}


export default MERNShowcase;