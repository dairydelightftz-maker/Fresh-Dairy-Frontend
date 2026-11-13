import { Link } from "react-router-dom";
import brandLogo from "../../../assets/fresh-dairy-logo-blue.png";
import "../../home/FreshDairy.css";

const values = [
    { title: "Quality", text: "We choose fresh ingredients and prepare each product with care." },
    { title: "Tradition", text: "We honour the Indian dairy-making traditions behind the flavours we share." },
    { title: "Love", text: "We put care into every batch, from paneer to festive sweets." },
    { title: "Community", text: "We believe good food brings people together around the table." },
];

export default function About() {
    return <main className="fresh-about-page">
        <section className="fresh-about-hero">
            <div><span className="fresh-kicker">THE FRESH DAIRY DELIGHT FZE</span><h1>Made with care.<br /><em>Rooted in tradition.</em></h1><p>Established on 7 July 2025, The Fresh Dairy Delight FZE makes paneer, kulfi and Indian sweets with a love for familiar flavours and thoughtful preparation.</p><Link to="/shop" className="fresh-button fresh-button-primary">Explore products</Link></div>
            <img src={brandLogo} alt="The Fresh Dairy Delight FZE blue logo" />
        </section>

        <section className="fresh-about-section">
            <span className="fresh-kicker">ABOUT US</span><h2>Tradition, shared at your table</h2>
            <p>At The Fresh Dairy Delight, we are passionate about bringing the taste of traditional Indian dairy products to your table. Our makers bring experience to every recipe, and our range includes fresh paneer, flavoured paneer, traditional kulfi, rabri and sweets. Yogurt, buttermilk and khoya are also part of our dairy range; please contact us for availability and pricing.</p>
            <p>Our work is guided by a simple idea: “Aam janata ky haq main kam karo”—work for the welfare of all. We aim to serve our community with wholesome, delicious dairy products that bring people together.</p>
        </section>

        <section className="fresh-about-values">
            <div className="fresh-about-values-inner"><span className="fresh-kicker">WHAT GUIDES US</span><h2>Our mission &amp; values</h2>
                <p className="fresh-about-mission">Our mission is to become a trusted name in traditional Indian dairy products through quality, authenticity and customer care—preserving the techniques we value while responding to the needs of our customers.</p>
                <div className="fresh-values-grid">{values.map((value) => <article className="fresh-value-card" key={value.title}><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
            </div>
        </section>

        <section className="fresh-philosophy-quote"><blockquote>“Savoring Tradition, Nourishing Love”</blockquote><p>The Fresh Dairy Delight FZE · Dairy Products Manufacturing</p></section>
        <div className="fresh-about-cta"><Link to="/#contact" className="fresh-button fresh-button-primary">Talk to our team</Link></div>
    </main>;
}
