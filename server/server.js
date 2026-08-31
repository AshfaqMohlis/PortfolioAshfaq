
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();


/* =========================================================
   RESEND
========================================================= */

const resend = new Resend(
  process.env.RESEND_API_KEY
);


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());


/* =========================================================
   ROOT / HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Ashfaq Portfolio API is running.",
  });

});


app.get("/api/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Ashfaq Portfolio API is running.",
  });

});


/* =========================================================
   CONTACT FORM
========================================================= */

app.post("/api/contact", async (req, res) => {

  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !name ||
      !email ||
      !message
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Name, email and message are required.",

      });

    }


    /* =====================================================
       SEND EMAIL WITH RESEND
    ===================================================== */

    const {
      data,
      error,
    } = await resend.emails.send({

      from:
        "Portfolio Contact <onboarding@resend.dev>",

      to: [
        process.env.CONTACT_EMAIL,
      ],

      replyTo: email,

      subject:
        subject ||
        `New Portfolio Message from ${name} `,

      html: `

  < !DOCTYPE html >

    <html>

      <head>

        <meta charset="UTF-8">

          <title>
            Portfolio Contact
          </title>

      </head>


      <body style="
          margin: 0;
          padding: 0;
          background: #f5f5f5;
          font-family: Arial, sans-serif;
        ">

        <div style="
            max-width: 650px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow:
              0 4px 20px
              rgba(0,0,0,0.08);
          ">


          <!-- HEADER -->

          <div style="
              padding: 25px;
              background: #111827;
              color: white;
            ">

            <h2 style="
                margin: 0;
              ">

              Ashfaq Portfolio
              Website Contact Form

            </h2>


            <p style="
                margin: 8px 0 0;
                color: #d1d5db;
              ">

              Someone submitted
              your portfolio contact form.

            </p>

          </div>


          <!-- CONTENT -->

          <div style="
              padding: 30px;
            ">


            <!-- NAME -->

            <div style="
                margin-bottom: 20px;
              ">

              <strong>
                Name
              </strong>


              <p style="
                  margin: 6px 0 0;
                  color: #374151;
                ">

                ${name}

              </p>

            </div>


            <!-- EMAIL -->

            <div style="
                margin-bottom: 20px;
              ">

              <strong>
                Email
              </strong>


              <p style="
                  margin: 6px 0 0;
                  color: #374151;
                ">

                ${email}

              </p>

            </div>


            <!-- SUBJECT -->

            <div style="
                margin-bottom: 20px;
              ">

              <strong>
                Subject
              </strong>


              <p style="
                  margin: 6px 0 0;
                  color: #374151;
                ">

                ${subject || "No subject"}

              </p>

            </div>


            <!-- MESSAGE -->

            <div>

              <strong>
                Message
              </strong>


              <div style="
                  margin-top: 10px;
                  padding: 15px;
                  background: #f9fafb;
                  border-radius: 8px;
                  color: #374151;
                  line-height: 1.6;
                  white-space: pre-wrap;
                ">

                ${message}

              </div>

            </div>


          </div>


          <!-- FOOTER -->

          <div style="
              padding: 20px 30px;
              background: #f9fafb;
              color: #6b7280;
              font-size: 13px;
            ">

            This message was sent
            from your portfolio website.

          </div>


        </div>

      </body>

    </html>

`,
    });


    /* =====================================================
       RESEND ERROR
    ===================================================== */

    if (error) {

      console.error(
        "Resend error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to send message.",

        error:
          error.message,

      });

    }


    /* =====================================================
       SUCCESS
    ===================================================== */

    console.log(
      "Portfolio contact email sent:",
      data
    );


    return res.status(200).json({

      success: true,

      message:
        "Message sent successfully.",

    });


  } catch (error) {

    console.error(
      "Contact API error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Something went wrong while sending the message.",

    });

  }

});


/* =========================================================
   START SERVER LOCALLY
========================================================= */

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {

  app.listen(PORT, () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  });

}


/* =========================================================
   EXPORT EXPRESS APP
========================================================= */

export default app;

