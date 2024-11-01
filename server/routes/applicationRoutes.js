import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";

const router = express.Router();

// POST : Soumettre une candidature
router.post('/add-app', ApplicationController.SubmitApplication);

// GET : Récupérer les candidatures d'un utilisateur spécifique
router.get('/get-application-user/:id', ApplicationController.GetApplicationsByUserId);

// GET : Récupérer les candidatures pour une offre d'emploi spécifique
router.get('/get-application-ad/:id', ApplicationController.GetApplicationsByAdId);

// GET : Récupérer toutes les candidatures (administrateur uniquement, à gérer si besoin)
router.get('/get-all-applications', ApplicationController.GetAllApplications);

// DELETE : Supprimer une candidature spécifique par son ID
router.delete('/delete-app/:id', ApplicationController.DeleteApplicationByAdId);

// DELETE : Supprimer toutes les candidatures liées à une offre d'emploi spécifique
router.delete('/delete-applications-ad/:adId', ApplicationController.DeleteApplicationsByAdId);

// PUT : Mettre à jour une candidature spécifique par son ID
router.put('/update-app/:id', ApplicationController.UpdateApplicationById);

export default router;
