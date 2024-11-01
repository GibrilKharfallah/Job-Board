import React, { useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../../../utils/authHeader";

const TableApps = ({ applications, setApplications }) => {
  const [message, setMessage] = useState("");
  const [adNames, setAdNames] = useState({});
  const [loading, setLoading] = useState(true); // pour indiquer si on est en chargement  genre "loading ..."

  // Fonction pour supprimer une candidature
  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_HOST}/application/delete-app/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
        }
        // Supprime la candidature localement
        setApplications(applications.filter((app) => app.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting application:", err);
        setMessage("Error deleting application.");
      });
  };

  // Fonction pour récupérer le nom de l'annonce par son ID
  const fetchAdName = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_HOST}/ad/get-ad/${id}`, {
        headers: authHeader(),
      });
      console.log(`Ad fetched for ID ${id}:`, res.data); // Vérification de la réponse
      return res.data.title; // Assurez-vous que cet attribut existe
    } catch (error) {
      console.error("Error fetching ad name:", error);
      return "Nom non disponible";
    }
  };

  // Récup all names
  useEffect(() => {
    const fetchAllAdNames = async () => {
      setLoading(true); // Start chargement
      const names = {};
      for (let app of applications) {
        const adName = await fetchAdName(app.jobId);
        names[app.jobId] = adName; // Stocke les noms avec les IDs correspondants
      }
      setAdNames(names); // Met a jour l'état avec tous les noms d'annonces
      setLoading(false); // Fin du chargement
    };

    if (applications.length > 0) {
      fetchAllAdNames();
    }
  }, [applications]);

  return (
    <>
      {message && <span className="error-message">{message}</span>}
      <table className="profile__table">
        <thead>
          <tr>
            <th>Nom de l'annonce</th>
            <th>Date de candidature</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Chargement...</td>
            </tr>
          ) : applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{adNames[app.jobId] || "Nom non disponible"}</td>
                <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(app.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucune candidature disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableApps;
