import WebsitePreview from "./WebsitePreview";


function WebsiteCarousel({ group }) {

    const carouselWebsites = [
        ...group.websites,
        ...group.websites,
    ];


    return (

        <div className="aa-website-carousel">

            <div className="aa-website-carousel-header">

                <div className="aa-website-group-title">

                    <span>
                        {String(
                            group.websites.length
                        ).padStart(2, "0")}
                    </span>

                    <h3>
                        {group.title}
                    </h3>

                </div>

            </div>


            <div className="aa-website-carousel-viewport">

                <div className="aa-website-carousel-track">

                    {carouselWebsites.map(
                        (site, index) => {

                            const originalIndex =
                                index %
                                group.websites.length;


                            return (

                                <article
                                    className="aa-website-carousel-card"
                                    key={`${site.url}-${index}`}
                                >

                                    <WebsitePreview
                                        site={site}
                                    />


                                    <div className="aa-website-carousel-content">

                                        <div className="aa-website-carousel-number">

                                            <span>
                                                {String(
                                                    originalIndex + 1
                                                ).padStart(2, "0")}
                                            </span>

                                            <span className="aa-website-type">
                                                {group.type}
                                            </span>

                                        </div>


                                        <h3>
                                            {site.name}
                                        </h3>


                                        <p>
                                            {site.description}
                                        </p>


                                        <div className="aa-website-carousel-footer">

                                            <a
                                                href={site.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Visit Website
                                            </a>

                                            <span className="aa-project-arrow">
                                                ↗
                                            </span>

                                        </div>

                                    </div>

                                </article>

                            );

                        }
                    )}

                </div>

            </div>

        </div>

    );
}


export default WebsiteCarousel;