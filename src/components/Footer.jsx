import "./../Footer.css";
import footerLogo from "../assets/fresh-dairy-logo-white.png";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_NUMBER } from "../config/contact";

export default function Footer() {
    return <>
        <footer className="footer fresh-footer">
            <div className="footer-container">
                <div className="footer-column brand fresh-footer-brand">
                    <img src={footerLogo} alt="The Fresh Dairy Delight FZE" className="footer-logo" width="1200" height="1200" loading="lazy" decoding="async" />
                    <p>Savoring Tradition, Nourishing Love</p>
                    <small>Fresh paneer · Traditional kulfi · Indian sweets</small>
                </div>
                <div className="footer-column">
                    <h3>Explore</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Products</Link></li>
                        <li><Link to="/about">Our story</Link></li>
                        <li><Link to="/#contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Your account</h3>
                    <ul>
                        <li><Link to="/profile">My Account</Link></li>
                        <li><Link to="/myorders">My Orders</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                    </ul>
                </div>
                <div className="footer-column fresh-footer-contact">
                    <h3>Call or WhatsApp</h3>
                    <ul className="contact">
                        <li>
                            <a href={`tel:+${WHATSAPP_NUMBER}`} aria-label={`Call ${WHATSAPP_DISPLAY_NUMBER}`}><FaPhoneAlt aria-hidden="true" />{WHATSAPP_DISPLAY_NUMBER}</a>
                            <a className="fresh-footer-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${WHATSAPP_DISPLAY_NUMBER}`}><FaWhatsapp aria-hidden="true" /></a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column fresh-order-note">
                    <h3>Made to order</h3>
                    <p>Our sweets are prepared to order. Message us to confirm availability and delivery timing.</p>
                    <Link to="/#contact">Send an enquiry</Link>
                </div>
            </div>
        </footer>
        <div className="copyright fresh-copyright">© {new Date().getFullYear()} The Fresh Dairy Delight FZE. All rights reserved.</div>
    </>;
}
