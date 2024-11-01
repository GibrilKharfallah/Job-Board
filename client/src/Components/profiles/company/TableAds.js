import { authHeader } from "../../../utils/authHeader";
import React, { useState } from "react";
import axios from "axios";
import FormUpdateAd from "../../home/FormUpdateAd";

const TableAds = ({ ads, setAds }) => {
    const [message, setMessage] = useState("");
    const [adToEdit, setAdToEdit] = useState(null);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/ad/delete-ad/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                if (res.data.message) {
                    setMessage(res.data.message);
                }
              
                setAds(ads.filter((ad) => ad.id !== id));
            })
            .catch((err) => {
                console.error("Error deleting ad:", err);
                setMessage("Error deleting ad.");
            });
    };

    
    const handleUpdate = (ad) => {
        setAdToEdit(ad); 
    };

    
    const handleCancelUpdate = () => {
        setAdToEdit(null); 
    };

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            {adToEdit ? ( 
                
                <FormUpdateAd
                    ad={adToEdit}
                    setAds={setAds}
                    onCancel={handleCancelUpdate}
                />
            ) : (
                <table className="profile__table">
                    <thead>
                    <tr>
                        <th>Nom du poste</th>
                        <th>Type de contrat</th>
                        <th>Salaire</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ads.length > 0 ? (
                        ads.map((ad) => (
                            <tr key={ad.id}>
                                <td>{ad.title}</td>
                                <td>{ad.contractType}</td>
                                <td>{ad.wage}</td>
                                <td>
                                    <div className="actions">
                                        <img
                                            src="/assets/img/icon-pencil.png"
                                            alt="Modifier"
                                            className="picto-pencil"
                                            onClick={() => handleUpdate(ad)}
                                        />
                                        <img
                                            src="/assets/img/icon-cross.png"
                                            alt="Supprimer"
                                            className="picto-cross"
                                            onClick={() => handleDelete(ad.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Aucune annonce disponible</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TableAds;
