
import { useState } from "react";

function Contact() {
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitContact = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        const contactData = {
            name: formData.get("name")?.trim() || "",
            email: formData.get("email")?.trim() || "",
            subject: formData.get("subject")?.trim() || "",
            message: formData.get("message")?.trim() || "",
        };

        /* FRONTEND VALIDATION */

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
            const response = await fetch("https://portfolio-ashfaq.vercel.app/api/contact", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(contactData),
            });

            let data = null;

            try {
                data = await response.json();
            } catch {
                throw new Error(
                    "The server returned an invalid response."
                );
            }

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to send your message."
                );
            }

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

    return (
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
                            type="text"
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
                            type="text"
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
    );
}

export default Contact;
