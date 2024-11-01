import CardAds from "./CardAds";

const CardsAds = ({ ads }) => {
    return (
        <section className="jobs__cards">
            {ads.length > 0 ? (
                ads.map((ad) => <CardAds key={ad.id} ad={ad} />)
            ) : (
                <p>No ads available at the moment.</p>
            )}
        </section>
    );
};

export default CardsAds;
