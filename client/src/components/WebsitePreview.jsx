
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


    /* =====================================================
       LAZY LOAD PREVIEW
    ===================================================== */

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


    /* =====================================================
       RESET IMAGE ERROR WHEN SITE CHANGES
    ===================================================== */

    useEffect(() => {

        setImageError(false);

    }, [site.image]);


    return (

        <div
            ref={previewRef}
            className="website-project-preview"
        >

            {!shouldLoad ? (

                /* =========================================
                   LAZY LOAD PLACEHOLDER
                ========================================= */

                <div className="website-preview-placeholder">

                    <div className="preview-placeholder-icon">
                        IMG
                    </div>

                    <span>
                        Loading preview...
                    </span>

                </div>

            ) : !imageError ? (

                /* =========================================
                   PNG IMAGE SCROLL CONTAINER
                ========================================= */

                <div className="website-image-scroll">

                    <img
                        src={site.image}
                        alt={`${site.name} website preview`}
                        className="website-image-preview"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        onError={() =>
                            setImageError(true)
                        }
                    />

                </div>

            ) : (

                /* =========================================
                   IMAGE ERROR
                ========================================= */

                <div className="website-preview-placeholder">

                    <div className="preview-placeholder-icon">
                        IMG
                    </div>

                    <span>
                        Preview unavailable
                    </span>

                </div>

            )}


            {/* =============================================
                BOTTOM FADE
            ============================================= */}

            {shouldLoad && !imageError && (

                <div
                    className="website-preview-fade"
                />

            )}


            {/* =============================================
                SCROLL LABEL
            ============================================= */}

            {shouldLoad && !imageError && (

                <div
                    className="website-scroll-label"
                >

                    <span>
                        ↕
                    </span>

                    Scroll to explore

                </div>

            )}

        </div>

    );
}


export default WebsitePreview;

