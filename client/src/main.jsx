import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { createRoot } from "react-dom/client";

import "./styles.css";


/* =========================================================
   SKILLS
========================================================= */

const skills = [
  [
    "Frontend",
    "HTML5 · CSS3 · JavaScript ES6+ · React · React Router · Redux · Redux Toolkit · Tailwind CSS · Bootstrap · Responsive Design · Vite",
  ],
  [
    "Backend",
    "Node.js · Express.js · REST APIs · JWT Authentication · bcrypt · CORS · Cookie-based Authentication · Middleware",
  ],
  [
    "Database",
    "MongoDB · Mongoose · MongoDB Atlas · Schema Design · CRUD · Filtering · Pagination · Aggregation fundamentals",
  ],
  [
    "CMS & Tools",
    "WordPress · Elementor · PHP · Git · GitHub · Postman · Stripe · Cloudinary · VS Code · Chrome DevTools",
  ],
];


/* =========================================================
   SELECTED WORK
========================================================= */

const projects = [
  [
    "01",
    "MERN E-Commerce Platform",
    "Full-stack shopping application with React, Redux Toolkit, Node.js, Express and MongoDB. Includes authentication, products, categories, filtering, cart management, pagination and admin workflows.",
    "React · Redux · Node · Express · MongoDB · Stripe",
  ],

  [
    "02",
    "WhatsApp-Style MERN App",
    "Designed a real-time messaging architecture using React on the frontend and Node/Express on the backend, with Socket-based communication concepts for live chat functionality.",
    "React · Node · Socket.IO · MongoDB",
  ],

  [
    "03",
    "Green Caterpillar Website",
    "Responsive WordPress website implementation using Elementor and custom HTML/CSS, including animated navigation, mobile drawer, responsive forms, typography and custom UI sections.",
    "WordPress · Elementor · CSS · Responsive UI",
  ],

  [
    "04",
    "Product & Image Management",
    "MERN product-management workflow with multiple product images, Cloudinary upload concepts, Multer, product validation, categories, stock, pricing and publishing controls.",
    "Multer · Cloudinary · Mongoose · REST API",
  ],
];


/* =========================================================
   WEBSITE GROUPS
========================================================= */

const websiteGroups = [
  {
    title: "WordPress",
    type: "WORDPRESS",

    websites: [
      {
        name: "Technology Rental",
        url: "https://technologyrental.com/",
        image: "/assets/images/technologyrental.com.pdf",
        description:
          "Technology rental and event equipment solutions.",
      },

      {
        name: "Technology Rental UK",
        url: "https://technologyrental.co.uk/",
        image: "/assets/images/technologyrentalcouk.pdf",
        description:
          "Technology rental services for events across the UK.",
      },

      {
        name: "Technology Rental Singapore",
        url: "https://technologyrental.sg/",
        image: "/assets/images/technologyrental-sg.pdf",
        description:
          "Event technology and equipment rental in Singapore.",
      },

      {
        name: "Hire Tablets Canada",
        url: "https://www.hiretablets.ca/",
        image: "/assets/images/hiretabletsca.pdf",
        description:
          "Tablet and IT equipment rental for Canadian events.",
      },

      {
        name: "Scottish Hire",
        url: "https://scottishhire.co.uk/",
        image: "/assets/images/scottishhirecouk.pdf",
        description:
          "Technology rental and event solutions across Scotland.",
      },

      {
        name: "OWR Event WiFi Canada",
        url: "https://owreventwifi.ca/",
        image: "/assets/images/owreventwifica.pdf",
        description:
          "Event WiFi and connectivity solutions in Canada.",
      },

      {
        name: "OWR Event WiFi UK",
        url: "https://owreventwifi.co.uk/",
        image: "/assets/images/owreventwificouk.pdf",
        description:
          "Event WiFi solutions for businesses and events.",
      },

      {
        name: "Event WiFi Canada",
        url: "https://event-wifi.ca/",
        image: "/assets/images/eventwifica.pdf",
        description:
          "Reliable WiFi and IT rental solutions for events.",
      },

      {
        name: "iPad Hire UK",
        url: "https://ipadhire.co.uk/",
        image: "/assets/images/ipadhirecouk.pdf",
        description:
          "Professional iPad and event technology rental.",
      },

      {
        name: "OWR Event WiFi Australia",
        url: "https://owreventwifi.com.au/",
        image: "/assets/images/owreventwifiau.pdf",
        description:
          "Event WiFi and technology solutions across Australia.",
      },

      {
        name: "OneWorld Staff",
        url: "https://oneworldstaff.com/",
        image: "/assets/images/oneworldstaff.pdf",
        description:
          "Event staffing and professional support solutions.",
      },
    ],
  },

  {
    title: "MERN Applications",
    type: "MERN",

    websites: [
      {
        name: "Blinkeyit — MERN E-Commerce App",
        url: "https://blinkeyit-3wtn.vercel.app/",
        image: "/assets/images/blinkeyit-3wtn.pdf",
        description:
          "Full-stack MERN e-commerce application with authentication, product management, categories, filtering, cart, orders, Stripe checkout and admin workflows.",
      },
    ],
  },

  {
    title: "Laravel — Front End Only",
    type: "LARAVEL",

    websites: [
      {
        name: "Technology Rental Australia",
        url: "https://technologyrental.com.au/",
        image: "/assets/images/technologyrentalau.pdf",
        description:
          "Technology rental and event solutions across Australia.",
      },

      {
        name: "OneWorldRental UAE",
        url: "https://oneworldrentalae.ae/",
        image: "/assets/images/oneworldrental.ae.pdf",
        description:
          "Technology rental solutions for the UAE market.",
      },

      {
        name: "Hire Laptops Australia",
        url: "https://www.hirelaptops.com.au/",
        image: "/assets/images/hirelaptopsau.pdf",
        description:
          "Laptop and IT equipment rental for Australian events.",
      },

      {
        name: "Laptop Rental Canada",
        url: "https://laptoprental.ca/",
        image: "/assets/images/laptoprentalca.pdf",
        description:
          "Laptop rental and technology solutions in Canada.",
      },
    ],
  },
];


/* =========================================================
   WEBSITE PREVIEW
   PDFs + IMAGES ARE LAZY LOADED
========================================================= */

function WebsitePreview({ site }) {
  const previewRef = useRef(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isPDF = /\.pdf($|[?#])/i.test(site.image);

  useEffect(() => {
    const element = previewRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px 0px",
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
            <span>↕</span>
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
              onError={() => setImageError(true)}
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


/* =========================================================
   WEBSITE CAROUSEL
   WORDPRESS + LARAVEL ONLY
========================================================= */

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


/* =========================================================
   MERN PROJECT SHOWCASE
   LEFT CONTENT + RIGHT PROJECT CARD
========================================================= */

function MERNShowcase() {
  return (
    <section className="mern-showcase">

      <div className="container">

        <div className="mern-showcase-grid">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="mern-showcase-content">

            <span className="mern-showcase-number">
              01
            </span>

            <p className="eyebrow">
              MERN STACK PROJECT
            </p>

            <h2>
              Blinkeyit
              <span> E-Commerce App</span>
            </h2>

            <p className="mern-showcase-description">
              A full-stack MERN e-commerce application
              built with React, Node.js, Express and
              MongoDB. The application includes
              authentication, product management,
              shopping cart, orders, payments and a
              responsive modern interface.
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


          {/* =================================================
              RIGHT PROJECT CARD
          ================================================= */}

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


              {/* =================================================
                  PROJECT PDF PREVIEW
              ================================================= */}

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


              {/* Card Footer */}

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


/* =========================================================
   SITE LOGO
========================================================= */

function SiteLogo() {
  return (
    <img
      src="/assets/images/site_logo.png"
      alt="Ashfaq"
      className="site-logo"
    />
  );
}


/* =========================================================
   APP
========================================================= */

function App() {

  /* =======================================================
     THEME
  ======================================================= */

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      "dark"
  );


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const [menu, setMenu] = useState(false);


  /* =======================================================
     CONTACT STATUS
  ======================================================= */

  const [status, setStatus] = useState("");


  /* =======================================================
     CONTACT LOADING STATE
  ======================================================= */

  const [isSubmitting, setIsSubmitting] = useState(false);


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
      !("IntersectionObserver" in window)
    ) {

      sections.forEach((section) => {
        section.classList.add(
          "is-visible"
        );
      });

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
     CONTACT FORM
     POST DATA TO EXPRESS + RESEND API
  ======================================================= */

  const submitContact = async (e) => {

    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = e.currentTarget;

    const formData = new FormData(form);

    const contactData = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      subject: formData.get("subject")?.trim(),
      message: formData.get("message")?.trim(),
    };


    /* =====================================================
       FRONTEND VALIDATION
    ===================================================== */

    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.message
    ) {

      setStatus(
        "Please fill in your name, email and message."
      );

      return;
    }


    setIsSubmitting(true);

    setStatus("Sending...");


    try {

      /* ===================================================
         POST REQUEST
      =================================================== */

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            contactData
          ),
        }
      );


      /* ===================================================
         READ API RESPONSE
      =================================================== */

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }


      /* ===================================================
         HANDLE HTTP ERROR
      =================================================== */

      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Failed to send your message."
        );

      }


      /* ===================================================
         SUCCESS
      =================================================== */

      if (data?.success) {

        setStatus(
          "Message sent successfully! I'll get back to you soon."
        );

        form.reset();

      } else {

        setStatus(
          data?.message ||
          "Unable to send your message."
        );

      }

    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );

      setStatus(
        error?.message ||
        "Something went wrong. Please try again."
      );

    } finally {

      setIsSubmitting(false);

    }

  };


  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMenu = () => {
    setMenu(false);
  };


  return (
    <>

      {/* =====================================================
          HEADER
      ===================================================== */}

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

            {[
              "home",
              "about",
              "skills",
              "projects",
              "websites",
              "experience",
              "education",
              "contact",
            ].map((item) => (

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


      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

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
                Building modern web experiences that{" "}
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


        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section
          id="about"
          className="section"
        >

          <div className="container two-col">

            <div>

              <p className="eyebrow">
                01 — ABOUT ME
              </p>

              <h2>
                Developer with a passion
                for turning ideas into products.
              </h2>

            </div>


            <div className="about-copy">

              <p>
                I am a Bachelor of Computer Science
                graduate with practical experience
                in frontend development, WordPress,
                Elementor and MERN stack application
                development.
              </p>


              <p>
                My work combines clean UI implementation
                with practical backend architecture,
                REST APIs, authentication, databases,
                state management and responsive design.
              </p>


              <div className="stats">

                <div>
                  <strong>CS</strong>
                  <small>Graduate</small>
                </div>

                <div>
                  <strong>MERN</strong>
                  <small>Stack</small>
                </div>

                <div>
                  <strong>WP</strong>
                  <small>Specialist</small>
                </div>

                <div>
                  <strong>API</strong>
                  <small>Development</small>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            SKILLS
        ===================================================== */}

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


        {/* =====================================================
            PROJECTS
            NO IMAGES IN THESE CARDS
        ===================================================== */}

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


        {/* =====================================================
            WEBSITE PORTFOLIO
        ===================================================== */}

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


            {/* =================================================
                WORDPRESS
            ================================================= */}

            <WebsiteCarousel
              group={websiteGroups[0]}
            />


            {/* =================================================
                MERN PROJECT
            ================================================= */}

            <MERNShowcase />


            {/* =================================================
                LARAVEL
            ================================================= */}

            <WebsiteCarousel
              group={websiteGroups[2]}
            />

          </div>

        </section>


        {/* =====================================================
            EXPERIENCE
        ================================================= */}

        <section
          id="experience"
          className="section"
        >

          <div className="container">

            <p className="eyebrow">
              05 — EXPERIENCE
            </p>

            <h2>
              Professional journey
            </h2>


            <div className="timeline">

              <article>

                <div className="year">
                  Web Development
                </div>

                <h3>
                  Cyberx Studio — Web Developer
                </h3>

                <p>
                  Worked on website development,
                  WordPress implementation, responsive
                  UI, debugging and client-focused
                  web solutions.
                </p>

              </article>


              <article>

                <div className="year">
                  2023 — 2025
                </div>

                <h3>
                  OneWorldRental — Web Development
                </h3>

                <p>
                  Worked with technology-rental
                  websites and web development tasks,
                  focusing on frontend implementation
                  and WordPress based solutions.
                </p>

              </article>


              <article>

                <div className="year">
                  Internship
                </div>

                <h3>
                  Intellilogics — JavaScript & React
                </h3>

                <p>
                  Worked on UI ideas, interface
                  development and debugging while
                  strengthening JavaScript and
                  React fundamentals.
                </p>

              </article>

            </div>

          </div>

        </section>


        {/* =====================================================
            EDUCATION
        ===================================================== */}

        <section
          id="education"
          className="section alt"
        >

          <div className="container two-col">

            <div>

              <p className="eyebrow">
                06 — EDUCATION
              </p>

              <h2>
                Academic foundation
              </h2>

            </div>


            <div className="education-card">

              <span>
                2016 — 2020
              </span>

              <h3>
                Bachelor of Computer Science
              </h3>

              <p>
                Computer Science graduate with
                a foundation in programming,
                software development, databases,
                web technologies and computer
                science concepts.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section
          className="section cta-section"
        >

          <div className="container cta">

            <div>

              <p className="eyebrow">
                LET'S WORK TOGETHER
              </p>

              <h2>
                Have a project or opportunity?
              </h2>

              <p>
                I'm interested in junior MERN,
                frontend, WordPress and web
                development opportunities.
              </p>

            </div>


            <a
              className="btn primary"
              href="#contact"
            >
              Get In Touch →
            </a>

          </div>

        </section>


        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section
          id="contact"
          className="section"
        >

          <div className="container contact-grid">

            <div>

              <p className="eyebrow">
                07 — CONTACT
              </p>

              <h2>
                Let's build something useful.
              </h2>

              <p>
                For job opportunities, freelance
                work, internships or collaboration,
                feel free to get in touch.
              </p>

            </div>


            <form
              className="contact-form"
              onSubmit={submitContact}
            >

              <label>

                Name

                <input
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />

              </label>


              <label>

                Email

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  disabled={isSubmitting}
                />

              </label>


              <label>

                Subject

                <input
                  name="subject"
                  placeholder="How can I help?"
                  disabled={isSubmitting}
                />

              </label>


              <label>

                Message

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project or opportunity..."
                  required
                  disabled={isSubmitting}
                />

              </label>


              <button
                className="btn primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send Message →"}
              </button>


              {status && (
                <p className="form-status">
                  {status}
                </p>
              )}

            </form>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>

        <div className="container footer">

          <a
            className="footer-logo"
            href="/"
            aria-label="Ashfaq Ahmad Home"
          >
            <SiteLogo />
          </a>

          <p>
            © 2026 Ashfaq Ahmad. Built with
            React, Node.js & Express.
          </p>

          <a href="/">
            Back to top ↑
          </a>

        </div>

      </footer>

    </>
  );
}


/* =========================================================
   REACT ROOT
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <App />
);