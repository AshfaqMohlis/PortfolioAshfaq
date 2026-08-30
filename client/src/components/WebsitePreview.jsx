import {
    useEffect,
    useRef,
    useState,
} from "react";


function WebsitePreview({ site }) {

    const previewRef = useRef(null);

    const [shouldLoad, setShouldLoad] =
        useState(false);

    const [imageError, setImageError] =
        useState(false);

    const isPDF =
        /\.pdf($|[?#])/i.test(site.image);


    useEffect(() => {

        const element =
            previewRef.current;

        if (!element) return;


        if (
            !("IntersectionObserver" in window)
        ) {

            setShouldLoad(true);

            return;

        }


        const observer =
            new IntersectionObserver(
                (entries) => {

                    const entry =
                        entries[0];

                    if (
                        entry.isIntersecting
                    ) {

                        setShouldLoad(true);

                        observer.disconnect();

                    }

                },
                {
                    rootMargin:
                        "600px 0px",

                    threshold: 0.01,
                }
            );


        observer.observe(element);


        return () => {
            observer.disconnect();
        };

    }, []);


    return (

        <div
            ref={previewRef}
            className="website-project-preview"
        >

            {!shouldLoad ? (

                <div className="website-preview-placeholder">

                    <div className="preview-placeholder-icon">
                        {isPDF ? "PDF" : "IMG"}
                    </div>

                    <span>
                        Loading preview...
                    </span>

                </div>

            ) : isPDF ? (

                <>

                    <iframe
                        src={`${site.image}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                        title={`${site.name} website preview`}
                        className="website-pdf-preview"
                        loading="lazy"
                        scrolling="yes"
                    />

                    <div className="website-preview-fade"></div>

                    <div className="website-scroll-label">

                        <span>
                            ↕
                        </span>

                        Scroll to explore

                    </div>

                </>

            ) : (

                <>

                    {!imageError ? (

                        <img
                            src={site.image}
                            alt={`${site.name} website preview`}
                            className="website-image-preview"
                            loading="lazy"
                            decoding="async"
                            onError={() =>
                                setImageError(true)
                            }
                        />

                    ) : (

                        <div className="website-preview-placeholder">

                            <div className="preview-placeholder-icon">
                                IMG
                            </div>

                            <span>
                                Preview unavailable
                            </span>

                        </div>

                    )}

                </>

            )}

        </div>

    );
}


export default WebsitePreview;