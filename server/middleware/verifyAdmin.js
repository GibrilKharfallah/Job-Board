import jwt from 'jsonwebtoken';
import sequelize from "../config/sequelize_database.js";
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';
const People = sequelize.models.People;
export const verifyAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Un token est requis pour accéder à cette ressource' });
    }

    try {
        req.user = jwt.verify(token, SECRET_KEY);  

        const user = await People.findByPk(req.user.id);

        if (!user || !user.is_admin) {
            return res.status(403).json({ error: 'Accès refusé. Vous n\'êtes pas administrateur.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};
