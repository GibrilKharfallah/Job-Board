import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import companyRoutes from "./routes/companyRoutes.js";
import peopleRoutes from './routes/peopleRoutes.js';
import adRoutes from './routes/adRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import { sequelize } from "./models/index.js";  

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Les modèles ont été synchronisés avec la base de données");
    })
    .catch((err) => {
        console.error("Erreur lors de la synchronisation des modèles :", err);
    });

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); 

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données MySQL réussie');
    })
    .catch(err => {
        console.error('Erreur lors de la connexion à la base de données :', err);
    });

app.use('/application', applicationRoutes);
app.use('/ad', adRoutes);
app.use('/people', peopleRoutes);
app.use('/company',companyRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
