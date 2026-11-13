import { useState } from "react";
import "./../Contact.css"
import { getAuthValue } from "../features/auth/authUtils";
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_NUMBER } from "../config/contact";

const ContactUs = () => {
    const [formData, setFormData] = useState(() => ({
        name: getAuthValue("first_name"),
        email: getAuthValue("email"),
        phone: "",
        subject: "",
        message: "",
    }));

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendWhatsApp = (e) => {
        e.preventDefault();

        const { name, email, phone, subject, message } = formData;

        if (!name || !email || !phone || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!WHATSAPP_NUMBER) {
            alert("WhatsApp contact is not configured yet.");
            return;
        }

        const text = `Hello Team,

Name: ${name}

Email: ${email}

Phone: ${phone}

Subject: ${subject}

Message:
${message}

Thank you.`;

        const messageWindow = window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener,noreferrer"
        );
        if (messageWindow) messageWindow.opener = null;
    };

    return (
        <section id="contact" className="contact-page" aria-labelledby="contact-heading">

            <div className="contact-header">

                <span className="contact-tag">
                    CONTACT US
                </span>

                <h2 id="contact-heading">
                    Talk to The Fresh Dairy Delight
                </h2>

                <p>
                    Ask about paneer, kulfi, rabri or sweets. Our sweets are made to order;
                    message us to confirm availability and preparation or delivery timing.
                </p>

            </div>

            <div className="contact-container">

                {/* Left */}

                <div className="contact-info">

                    <h2>Call or WhatsApp</h2>

                    <div className="fresh-contact-numbers">
                        <div className="fresh-contact-number">
                            <a href={`tel:+${WHATSAPP_NUMBER}`}>{WHATSAPP_DISPLAY_NUMBER}</a>
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${WHATSAPP_DISPLAY_NUMBER}`}>WhatsApp</a>
                        </div>
                    </div>

                    <div className="info-box">

                        <h4>Product enquiries</h4>

                        <p>
                            Paneer, kulfi, rabri and Indian sweets
                        </p>

                        <p>
                            Tell us which products you are interested in.
                        </p>

                    </div>

                    <div className="info-box">

                        <h4>Made to order</h4>

                        <p>
                            Sweets are made to order. Please ask us to confirm preparation and delivery timing.
                        </p>

                    </div>

                    <div className="info-box">

                        <h4>Our dairy range</h4>

                        <p>
                            Contact us for current availability and pricing for yogurt, buttermilk and khoya.
                        </p>

                    </div>

                </div>

                {/* Right */}

                <form
                    className="contact-form"
                    onSubmit={sendWhatsApp}
                >

                    <div className="input-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />



                    </div>

                    <div className="input-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>
                            Subject
                        </label>

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select a Subject
                            </option>

                            <option>
                                Product Enquiry
                            </option>

                            <option>
                                Availability enquiry
                            </option>

                            <option>
                                Quotation request
                            </option>

                            <option>
                                Product information
                            </option>

                            <option>
                                Order timing
                            </option>

                            <option>
                                General enquiry
                            </option>

                        </select>

                    </div>

                    <div className="input-group">

                        <label>
                            Message
                        </label>

                        <textarea
                            rows="6"
                            name="message"
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="whatsapp-btn"
                        type="submit"
                    >

                        Send via WhatsApp →

                    </button>

                </form>

            </div>

        </section>
    );
};

export default ContactUs;
