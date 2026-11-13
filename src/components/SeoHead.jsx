import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "The Fresh Dairy Delight FZE | Savoring Tradition, Nourishing Love";
const DEFAULT_DESCRIPTION = "Fresh paneer, traditional kulfi, rabri and Indian sweets from The Fresh Dairy Delight FZE. Call or WhatsApp us to enquire.";
const SHARE_IMAGE = "/fresh-dairy-logo-blue.png";

const routeMeta = [
    { match: /^\/$/, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
    { match: /^\/(shop|products)\/?$/, title: "Paneer, Kulfi & Indian Sweets | Fresh Dairy Delight", description: "Explore paneer varieties, traditional kulfi, rabri and made-to-order Indian sweets." },
    { match: /^\/about\/?$/, title: "Our Story | The Fresh Dairy Delight FZE", description: "Learn about The Fresh Dairy Delight FZE, our dairy range, mission and values." },
    { match: /^\/contact\/?$/, title: "Contact | The Fresh Dairy Delight FZE", description: "Call or WhatsApp The Fresh Dairy Delight FZE about paneer, kulfi, rabri and sweets." },
    { match: /^\/single\//, title: "Product Details | The Fresh Dairy Delight FZE", description: "See product information and availability from The Fresh Dairy Delight FZE." },
];

function setMeta(attribute, value, content) {
    let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
    }
    element.setAttribute("content", content);
}

export default function SeoHead() {
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname || "/";
        const metadata = routeMeta.find((route) => route.match.test(pathname)) || {
            title: DEFAULT_TITLE,
            description: DEFAULT_DESCRIPTION,
        };
        const siteUrl = window.location.origin;
        const canonicalUrl = new URL(pathname === "/" ? "/" : pathname.replace(/\/$/, ""), siteUrl).toString();
        const shareImageUrl = new URL(SHARE_IMAGE, siteUrl).toString();

        document.title = metadata.title;
        setMeta("name", "description", metadata.description);
        setMeta("property", "og:title", metadata.title);
        setMeta("property", "og:description", metadata.description);
        setMeta("property", "og:url", canonicalUrl);
        setMeta("property", "og:image", shareImageUrl);
        setMeta("property", "og:site_name", "The Fresh Dairy Delight FZE");
        setMeta("name", "twitter:title", metadata.title);
        setMeta("name", "twitter:description", metadata.description);
        setMeta("name", "twitter:image", shareImageUrl);

        let canonical = document.head.querySelector("link[rel=canonical]");
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        let structuredData = document.getElementById("fresh-dairy-organization");
        if (!structuredData) {
            structuredData = document.createElement("script");
            structuredData.id = "fresh-dairy-organization";
            structuredData.type = "application/ld+json";
            document.head.appendChild(structuredData);
        }
        structuredData.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "The Fresh Dairy Delight FZE",
            legalName: "The Fresh Dairy Delight FZE",
            foundingDate: "2025-07-07",
            url: siteUrl,
            logo: shareImageUrl,
            description: DEFAULT_DESCRIPTION,
        });
    }, [location.pathname]);

    return null;
}
