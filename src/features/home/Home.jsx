import "./Home.css";
import "./FreshDairy.css";
import Heropage from "./components/Heropage";
import Shop_by_category from "./components/Shop_by_category";
import New_Arrival_Home from "./components/New_Arrival_Home";
import HomepageProductSection from "./components/HomepageProductSection";
import HomepageBrandSection from "./components/HomepageBrandSection";
import HomepageTrustBenefits from "./components/HomepageTrustBenefits";
import Homepage_Query from "./queries/Homepage_Query";
import Product_Query from "../sale/queries/Product_Query";
import Offer_poster from "../../hooks/offers/page/Offer_poster";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";
import { whatsappOrderUrl } from "./freshDairyCatalog";
import brandLogo from "../../assets/fresh-dairy-logo-blue.png";
import ContactUs from "../../components/Contact";

const asArray = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.results)) return value.results;
    if (Array.isArray(value?.items)) return value.items;
    return [];
};

const brandsFromProducts = (products) => {
    const brands = new Map();

    asArray(products).forEach((product) => {
        const brand = product?.brand;
        const id = brand?.id ?? brand?.pk;
        if (id === null || id === undefined) return;

        const current = brands.get(String(id));
        brands.set(String(id), {
            ...brand,
            id,
            product_count: (current?.product_count || 0) + 1,
        });
    });

    return [...brands.values()];
};

function HomeLoading() {
    return (
        <main className="homepage-discovery fresh-site homepage-loading" aria-busy="true" aria-label="Loading homepage">
            <div className="homepage-loading-hero skeleton" />
            <div className="homepage-loading-section">
                <div className="skeleton skeleton-text" />
                <div className="homepage-loading-grid">{Array.from({ length: 8 }).map((_, index) => <div className="homepage-loading-card skeleton" key={index} />)}</div>
            </div>
        </main>
    );
}

function Home() {
    const location = useLocation();
    const { data: homepageData = {}, isLoading, isError, error, refetch } = Homepage_Query();
    const homepageBrands = asArray(homepageData.shop_by_brand);
    const { data: brandProducts } = Product_Query(
        { page_size: 100 },
        { enabled: !isLoading && !isError && homepageBrands.length === 0 }
    );

    useEffect(() => {
        if (location.hash !== "#contact" || isLoading || isError) return;

        const frame = window.requestAnimationFrame(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isError, isLoading, location.hash, location.key]);

    if (isLoading) return <HomeLoading />;

    if (isError) {
        return (
            <main className="homepage-discovery fresh-site homepage-state" role="alert">
                <h1>We couldn&apos;t load the home page</h1>
                <p>{error?.response?.data?.detail || "Please try again in a moment."}</p>
                <button type="button" onClick={() => refetch()}>Try again</button>
            </main>
        );
    }

    const categories = asArray(homepageData.categories);
    const heroBanners = asArray(homepageData.hero_banners);
    const newArrivals = homepageData.new_arrivals;
    const newArrivalProducts = asArray(newArrivals);
    const homepageBrandsForDisplay = homepageBrands.length ? homepageBrands : brandsFromProducts(brandProducts);

    return (
        <main className="homepage-discovery fresh-site">
            <Heropage heroBanners={heroBanners} />

            {categories.length > 0 && (
                <div className="category-section-wrapper" style={{ background: "#F3F6F8", padding: "14px 15px 28px" }}>
                    <Shop_by_category categories={categories} />
                </div>
            )}

            {newArrivalProducts.length > 0 && (
                <div id="new-arrivals" className="fresh-home-new-arrivals">
                    <New_Arrival_Home
                        products={newArrivalProducts}
                        totalCount={newArrivals?.count}
                        title="New Arrivals"
                        subtitle="Fresh paneer, traditional kulfi and sweets for your table."
                        viewAllTo="/shop?sort=new"
                        showNewBadge
                        tone="new"
                    />
                </div>
            )}

            <Offer_poster />
            <HomepageProductSection title="Trending now" eyebrow="Popular right now" section={homepageData.trending_now} tone="trending" />
            <HomepageProductSection title="Top deals" eyebrow="Offers worth a look" section={homepageData.top_deals} tone="deals" />
            <HomepageProductSection title="Best sellers" eyebrow="Customer favourites" section={homepageData.best_sellers} tone="bestsellers" />
            <HomepageProductSection title="Just for you" eyebrow="Picked for your next find" section={homepageData.just_for_you} tone="personal" />
            <HomepageBrandSection brands={homepageBrandsForDisplay} />
            <HomepageProductSection title="Recently viewed" eyebrow="Pick up where you left off" section={homepageData.recently_viewed} tone="recent" />
            <HomepageTrustBenefits benefits={asArray(homepageData.trust_benefits)} />

            <section className="fresh-story">
                <div className="fresh-story-mark"><img src={brandLogo} alt="The Fresh Dairy Delight FZE logo" loading="lazy" /></div>
                <div><span className="fresh-kicker">OUR PROMISE</span><h2>“Aam janata ky haq main kam karo.”</h2><p>Work for the welfare of all. We believe wholesome, delicious food brings people together, and we honour that belief in every product we make.</p><Link to="/about" className="fresh-text-link">Meet our story <FiArrowRight aria-hidden="true" /></Link></div>
            </section>

            <section className="fresh-order-cta">
                <span className="fresh-kicker">FOR YOUR HOME, TABLE OR CELEBRATION</span>
                <h2>Tell us what you’re craving.</h2>
                <p>Our sweets are made to order. Send us your selection and our team will confirm availability and timing.</p>
                <a className="fresh-button fresh-button-primary" href={whatsappOrderUrl()} target="_blank" rel="noreferrer"><FiMessageCircle aria-hidden="true" /> Start a WhatsApp enquiry</a>
            </section>

            <ContactUs />

        </main>
    );
}

export default Home;
