import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import de useParams
import FormRegisterAd from "../Components/profiles/company/FormRegisterAd";
import TableAds from "../Components/profiles/company/TableAds";
import Header from "../Pages/Header";
import FormUpdateCompany from "../Components/home/FormUpdateCompany";

const ProfileCompany = () => {
    const { id } = useParams(); // Récupère l'ID depuis les paramètres de l'URL
    const [company, setCompany] = useState({});
    const [ads, setAds] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true); // Ajout d'un état loading
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const userId = storedUser?.user?.id;
    const isAdmin = storedUser?.user?.isAdmin;
    const effectiveId = isAdmin ? id : userId; // Utilise l'ID de useParams si admin, sinon l'ID du token

    useEffect(() => {
        if (!token || !effectiveId) {
            setMessage("Erreur : Utilisateur non authentifié ou ID utilisateur non trouvé.");
        }
    }, [token, effectiveId]);

    const fetchCompanyInfo = () => {
        axios
            .get(`http://localhost:5000/company/get-company/${effectiveId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCompany(res.data);
                setLoading(false); // Désactiver l'état loading une fois que les données sont récupérées
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des informations de l'entreprise :", error);
                setMessage("Erreur lors de la récupération des informations de l'entreprise");
                setLoading(false); // Désactiver l'état loading même en cas d'erreur
            });
    };

    const fetchAds = () => {
        if (!company.id) {
            return;
        }
        axios
            .get(`http://localhost:5000/ad/get-ads/${company.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setAds(res.data);
                } else {
                    setMessage("Aucune annonce trouvée pour cette entreprise.");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des annonces :", error);
                setMessage("Erreur lors de la récupération des annonces ou aucune annonce disponible.");
            });
    };

    useEffect(() => {
        if (token && effectiveId) {
            fetchCompanyInfo();
        }
    }, [effectiveId, token]);

    useEffect(() => {
        if (!loading && company.id) {
            fetchAds();
        }
    }, [loading, company.id]);

    const handleAddAdvertisementClick = () => {
        setShowForm(!showForm);
    };

    const handleEditProfileClick = () => {
        setShowEditForm(!showEditForm);
    };

    return (
        <>
            <Header />
            <section className="profile">
                {loading ? (
                    <p>Chargement des informations de l'entreprise...</p>
                ) : (
                    <>
                        <h1>{company.name}</h1>
                        {message && <p>{message}</p>}
                        <div className="profile__opt__btns">
                            <button onClick={handleAddAdvertisementClick}>
                                {showForm ? "Annuler" : "Ajouter une annonce"}
                            </button>
                            <button onClick={handleEditProfileClick}>
                                {showEditForm ? "Annuler l'édition" : "Modifier le profil"}
                            </button>
                        </div>

                        {showForm && (
                            <FormRegisterAd
                                company={company}
                                token={token}
                                fetchAds={fetchAds}
                            />
                        )}

                        {showEditForm && (
                            <FormUpdateCompany
                                company={company}
                                token={token}
                                fetchCompanyInfo={fetchCompanyInfo}
                            />
                        )}

                        <TableAds ads={ads} setAds={setAds} />
                    </>
                )}
            </section>
        </>
    );
};

export default ProfileCompany;
