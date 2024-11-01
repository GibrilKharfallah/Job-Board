import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const FormUpdateCompany = () => {
    const { id } = useParams(); 
    const [company, setCompany] = useState({});
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [message, setMessage] = useState("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const companyId = storedUser?.user?.id;
    const isAdmin = storedUser?.user?.isAdmin;

    const effectiveId = isAdmin ? id : companyId; 

    useEffect(() => {
        if (effectiveId && token) {
            const fetchCompanyInfo = () => {
                axios
                    .get(`http://localhost:5000/company/get-company/${effectiveId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) => {
                        setCompany(res.data);
                        setEmail(res.data.email);
                        setCompanyName(res.data.name);
                        setCity(res.data.city);
                        setRegion(res.data.region);
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la récupération des informations de l'entreprise :", error);
                        setMessage(
                            "Erreur lors de la récupération des informations de l'entreprise"
                        );
                    });
            };

            fetchCompanyInfo();
        } else {
            setMessage("Erreur : ID de l'entreprise ou jeton manquant.");
        }
    }, [effectiveId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "companyName") setCompanyName(value);
        if (name === "city") setCity(value);
        if (name === "region") setRegion(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: companyName,
            email,
            city,
            region,
        };

        if (effectiveId && token) {
            axios
                .put(`http://localhost:5000/company/update-company/${effectiveId}`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    if (res.data.message) {
                        return setMessage(res.data.message);
                    }
                    setMessage("Profil de l'entreprise mis à jour avec succès");
                })
                .catch((err) => {
                    setMessage("Erreur lors de la mise à jour du profil de l'entreprise");
                    console.error(err);
                });
        } else {
            setMessage("Erreur : ID de l'entreprise ou jeton manquant.");
        }
    };

    return (
        <article className="home__container--sign-in">
            {message && <span className="error-message">{message}</span>}
            <form
                className="home__container--sign-in__form"
                method="post"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={companyName} 
                    id="companyName"
                    name="companyName"
                    placeholder="Nom de l'entreprise"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={city}
                    id="city"
                    name="city"
                    placeholder="Ville"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={region} 
                    id="region"
                    name="region"
                    placeholder="Région"
                    required
                    onChange={handleChange}
                />
                <div className="home__container--sign-in__form__btns">
                    <button type="submit">Mettre à jour</button>
                </div>
            </form>
        </article>
    );
};

export default FormUpdateCompany;
