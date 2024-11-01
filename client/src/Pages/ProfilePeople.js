import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import de useParams
import TableApps from "../Components/profiles/people/TableApps.js";
import Header from "../Pages/Header";
import FormUpdatePeople from "../Components/home/FormUpdatePeople";

const ProfilePeople = () => {
    const { id } = useParams(); // Récupère l'ID depuis les paramètres de l'URL
    const [user, setUser] = useState({});
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

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

    const fetchUserInfo = () => {
        axios
            .get(`http://localhost:5000/people/get-people/${effectiveId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des informations utilisateur :", error);
                setMessage("Erreur lors de la récupération des informations utilisateur");
            });
    };

    const fetchApplications = () => {
        axios
            .get(
                `http://localhost:5000/application/get-application-user/${effectiveId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setApplications(res.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des candidatures :", error);
                setMessage("Erreur lors de la récupération des candidatures");
            });
    };

    useEffect(() => {
        if (token && effectiveId) {
            fetchUserInfo();
            fetchApplications();
        }
    }, [effectiveId, token]);

    const handleEditProfileClick = () => {
        setShowForm(!showForm); 
    };

    return (
        <>
            <Header />
            <section className="profile">
                <h1>{user.name}</h1>
                <div className="profile__opt__btns">
                    <button onClick={handleEditProfileClick}>
                        {showForm ? "Annuler l'édition" : "Modifier le profil"}
                    </button>
                </div>
                {message && <p>{message}</p>}
                {showForm && (
                    <FormUpdatePeople
                        initialData={user} 
                    />
                )}
                <TableApps
                    applications={applications}
                    setApplications={setApplications}
                />
            </section>
        </>
    );
};

export default ProfilePeople;
