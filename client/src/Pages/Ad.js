import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Ad = () => {
    const { id } = useParams(); // Obtenez l'ID de l'annonce depuis l'URL
    const [ad, setAd] = useState({});
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Récupérer les détails de l'annonce
        const fetchAdDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/ad/get-ad/${id}`
                );
                setAd(response.data);
                const companyResponse = await axios.get(
                    `http://localhost:5000/company/get-company/${response.data.companyId}`
                );
                setCompany(companyResponse.data);
            } catch (error) {
                setError("Error fetching ad details");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdDetails();
    }, [id]);

    const handleApply = async () => {
        const storedData = JSON.parse(localStorage.getItem("user"));
        const applicantId = storedData ? storedData.user.id : null; // Récupérer l'ID de l'utilisateur
        const token = storedData ? storedData.token : null; // Récupérer le token
        const userType = storedData ? storedData.user.userType : null; // Récupérer le type d'utilisateur

        // Vérifie si l'utilisateur est de type 'people'
        if (userType !== "people") {
            alert("Seuls les utilisateurs de type 'people' peuvent postuler.");
            return;
        }

        if (applicantId && token) {
            try {
                await axios.post(
                    "http://localhost:5000/application/add-app",
                    {
                        applicantId: applicantId,
                        jobId: id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
                        },
                    }
                );
                alert("Application submitted successfully!");
            } catch (error) {
                console.error("Error submitting application:", error);
                alert("Failed to submit application.");
            }
        } else {
            alert("User not logged in.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (

        <>
        <Header />
        <section className="jobs__modal">
            <article className="jobs__modal__content">
                <div className="jobs__modal__content__card">
                    <article>
                        <h2>{ad.title}</h2>
                        <h3>{company.name}</h3>
                    </article>
                    <article>
                        <figure>
                            <img
                                src="../../assets/img/icon-location.png"
                                alt=""
                            />
                            <figcaption>
                                {ad.city}, {ad.region}
                            </figcaption>
                        </figure>
                        <figure>
                            <img src="../../assets/img/icon-clock.png" alt="" />
                            <figcaption>{ad.contractType}</figcaption>
                        </figure>

                        <figure>
                            <img
                                src="../../assets/img/icon-location.png"
                                alt=""
                            />
                            <figcaption>{ad.sector}</figcaption>
                        </figure>

                        <figure>
                            <img src="../../assets/img/icon-euro.png" alt="" />
                            <figcaption>{ad.wage}</figcaption>
                        </figure>

                        <figure>
                            <img
                                src="../../assets/img/icon-location.png"
                                alt=""
                            />
                            <figcaption>{ad.description}</figcaption>
                        </figure>

                        <figure>
                            <img
                                src="../../assets/img/icon-location.png"
                                alt=""
                            />
                            <figcaption>
                                {" "}
                                From{" "}
                                {new Date(
                                    ad.startingDate
                                ).toLocaleDateString()}{" "}
                                to{" "}
                                {new Date(ad.expiringDate).toLocaleDateString()}
                            </figcaption>
                        </figure>
                    </article>
                    <button onClick={handleApply}>Apply</button>
                </div>
            </article>
        </section>
        </>
    );
};

export default Ad;
