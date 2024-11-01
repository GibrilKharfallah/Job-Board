import React, { useState } from "react";
import axios from "axios";
import { authHeader } from "../../utils/authHeader";

const FormUpdateAd = ({ ad, setAds, onCancel }) => {
    const [title, setTitle] = useState(ad.title);
    const [description, setDescription] = useState(ad.description);
    const [contractType, setContractType] = useState(ad.contractType);
    const [sector, setSector] = useState(ad.sector);
    const [city, setCity] = useState(ad.city);
    const [region, setRegion] = useState(ad.region);
    const [wage, setWage] = useState(ad.wage);
    const [startingDate, setStartingDate] = useState(ad.startingDate);
    const [expiringDate, setExpiringDate] = useState(ad.expiringDate);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAd = {
            title,
            description,
            contractType,
            sector,
            city,
            region,
            wage,
            startingDate,
            expiringDate,
        };

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_HOST}/ad/update-ad/${ad.id}`,
                updatedAd,
                { headers: authHeader() }
            );

            // Mettre à jour la liste des annonces avec l'annonce modifiée
            setAds((prevAds) =>
                prevAds.map((prevAd) =>
                    prevAd.id === ad.id ? { ...prevAd, ...response.data } : prevAd
                )
            );
            setMessage("Annonce mise à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'annonce :", error);
            setMessage("Erreur lors de la mise à jour de l'annonce.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="profile__form">
            {message && <p>{message}</p>}
            <div>
                <label htmlFor="title">Nom du poste :</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description :</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="contractType">Type de contrat :</label>
                <input
                    type="text"
                    id="contractType"
                    name="contractType"
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="sector">Secteur :</label>
                <input
                    type="text"
                    id="sector"
                    name="sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="city">Ville :</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="region">Région :</label>
                <input
                    type="text"
                    id="region"
                    name="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="wage">Salaire :</label>
                <input
                    type="number"
                    id="wage"
                    name="wage"
                    value={wage}
                    onChange={(e) => setWage(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="startingDate">Date de début :</label>
                <input
                    type="date"
                    id="startingDate"
                    name="startingDate"
                    value={startingDate}
                    onChange={(e) => setStartingDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="expiringDate">Date de fin :</label>
                <input
                    type="date"
                    id="expiringDate"
                    name="expiringDate"
                    value={expiringDate}
                    onChange={(e) => setExpiringDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-update-ad__buttons">
                <button type="submit">Enregistrer les modifications</button>
                <button type="button" onClick={onCancel}>
                    Annuler
                </button>
            </div>
        </form>
    );
};

export default FormUpdateAd;
