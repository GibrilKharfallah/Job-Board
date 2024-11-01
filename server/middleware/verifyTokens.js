import jwt from 'jsonwebtoken';
import * as PeopleController from '../controllers/peopleController.js'; // Importer le contrôleur People

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token Bearer

    if (!token) {
        return res.status(403).json({ error: 'Un token est requis pour accéder à cette ressource' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const response = await PeopleController.GetPeopleById({ params: { id: decoded.id } }, res);
        
        if (!response) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const user = response.data;

        req.user = user;

        if (user.isAdmin) {
            return next(); 
        }

        return res.status(403).json({ error: "Accès refusé : Vous n'êtes pas administrateur" });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expiré !' });
        } else {
            return res.status(401).json({ error: 'Token invalide !' });
        }
    }
};
