// src/components/ErrorLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorLogin.css'; // On importe le CSS pour le style

const ErrorLogin = () => {
    const navigate = useNavigate();

    // Fonction pour rediriger l'utilisateur vers la page de connexion
    const handleLoginRedirect = () => {
        navigate('/');
    };

    return (
        <div className="error-login-container">
            <div className="error-login-message">
                <h1>Accès Refusé</h1>
                <p>Il semble que vous n'ayez pas de token de vérification. Veuillez vous connecter.</p>
                <button onClick={handleLoginRedirect} className="login-button">
                    Aller à la page de connexion
                </button>
            </div>
        </div>
    );
};

export default ErrorLogin;
