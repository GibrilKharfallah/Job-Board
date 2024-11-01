import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardAds = ({ ad }) => {
    const [company, setCompany] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Navigate to une new page pas vers elbaf malheureusement

    // Effectuer une requête pour obtenir les informations
    // de la société liée à l'annonce
    useEffect(() => {
        axios
            .get(`http://localhost:5000/company/get-company/${ad.companyId}`)
            .then((res) => {
                setCompany(res.data);
            })
            .catch((error) => {
                console.error("Error fetching company name", error);
                setMessage("Unable to load company information");
            });
    }, [ad.companyId]);

    const handleShowMore = () => {
        navigate(`/ad/${ad.id}`); // Redirige vers la page de détails
    };

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <article className="jobs__cards__card">
                <section className="jobs__cards__card--content">
                    <h3>{company.name}</h3>
                    <h3>{ad.title}</h3>
                    <section className="jobs__cards__card--separation"></section>
                    <section className="jobs__cards__card--details">
                        <section>
                            <figure>
                                <img
                                    src="../../../assets/img/icon-location.png"
                                    alt="location"
                                />
                                <figcaption>
                                    {ad.city}, {ad.region}
                                </figcaption>
                            </figure>
                            <figure>
                                <img
                                    src="../../../assets/img/icon-clock.png"
                                    alt="clock"
                                />
                                <figcaption>{ad.contractType}</figcaption>
                            </figure>
                            <figure>
                                <img
                                    src="../../../assets/img/icon-building.png"
                                    alt="building"
                                />
                                <figcaption>{ad.sector}</figcaption>
                            </figure>
                            <figure>
                                <img
                                    src="../../../assets/img/icon-euro.png"
                                    alt="wage"
                                />
                                <figcaption>{ad.wage}</figcaption>
                            </figure>
                        </section>
                        <button onClick={handleShowMore}>Show more</button>
                    </section>
                </section>
            </article>
        </>
    );
};

export default CardAds;
