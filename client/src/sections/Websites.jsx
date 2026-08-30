import WebsiteCarousel
    from "../components/WebsiteCarousel";

import MERNShowcase
    from "../components/MERNShowcase";

import {
    websiteGroups,
} from "../data/portfolioData";


function Websites() {

    return (

        <section
            id="websites"
            className="section alt website-section"
        >

            <div className="container">

                <p className="eyebrow">
                    04 — CLIENT WORK
                </p>


                <h2>
                    Websites I've worked on
                </h2>


                {/* WORDPRESS */}

                <WebsiteCarousel
                    group={websiteGroups[0]}
                />


                {/* MERN */}

                <MERNShowcase />


                {/* LARAVEL */}

                <WebsiteCarousel
                    group={websiteGroups[2]}
                />

            </div>

        </section>

    );
}


export default Websites;