import React, { useState } from "react";
import axios from "axios";

const FormRegisterAd = ({ company, token, fetchAds }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [wage, setWage] = useState("");
    const [message, setMessage] = useState("");
    const [startingDate, setStartingDate] = useState("");
    const [expiringDate, setExpiringDate] = useState("");
    const [contractType, setContractType] = useState("");
    const [sector, setSector] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Ajoute un console.log pour chaque modification d'entrée
        console.log(`Field changed: ${name}, Value: ${value}`);

        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "city":
                setCity(value);
                break;
            case "region":
                setRegion(value);
                break;
            case "wage":
                setWage(parseInt(value));
                break;
            case "startingDate":
                setStartingDate(value);
                break;
            case "expiringDate":
                setExpiringDate(value);
                break;
            case "contractType":
                setContractType(value);
                break;
            case "sector":
                setSector(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const companyId = company.id;

        // Vérifie que companyId est bien défini avant l'envoi
        console.log(`Submitting with companyId: ${companyId}`);

        const newJob = {
            title,
            description,
            contractType,
            sector,
            city,
            region,
            companyId,
            wage,
            startingDate,
            expiringDate,
        };

        // Log des données envoyées dans la requête
        console.log("Job data to be sent:", newJob);

        axios
            .post("http://localhost:5000/ad/add-ad", newJob, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                // Affiche la réponse du serveur
                console.log("Job offer created successfully, response:", res);
                setMessage("Job offer created successfully!");
                fetchAds(); // Rafraîchir la liste des annonces après création
            })
            .catch((error) => {
                // Affiche les erreurs
                console.error("Error creating job offer:", error);
                setMessage("Error creating job offer.");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="profile__form">
            <h2>Create a Job Offer</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Job Title"
                value={title}
                onChange={handleChange}
                required
            />
            <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={description}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                id="region"
                name="region"
                placeholder="Region"
                value={region}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                id="wage"
                name="wage"
                placeholder="Wage"
                value={wage}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                id="startingDate"
                name="startingDate"
                value={startingDate}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                id="expiringDate"
                name="expiringDate"
                value={expiringDate}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                id="contractType"
                name="contractType"
                placeholder="Contract type"
                value={contractType}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                id="sector"
                name="sector"
                placeholder="Sector"
                value={sector}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormRegisterAd;
