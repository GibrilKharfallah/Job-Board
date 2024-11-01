import express from "express";
import * as AdController from "../controllers/adController.js";
import { verifyToken } from "../middleware/verifyTokens.js";

const router = express.Router();

// GET : Récupérer toutes les offres d'emploi
router.get("/get-ads", AdController.GetAllAds);

// GET : Récupérer une offre d'emploi par ID
router.get("/get-ad/:id", AdController.GetAdById);

// GET : Récupérer les offres d'emploi pour un recruteur'
router.get("/get-ads/:id", AdController.GetAdByCompanyId);

router.get("/admin-get-ads/:id", AdController.AdminGetAdByCompanyId); 

// POST : Créer une nouvelle offre d'emploi
router.post("/add-ad", AdController.CreateAd);

// PUT : Mettre à jour une offre d'emploi
router.put("/update-ad/:id", AdController.UpdateAd);

// DELETE : Supprimer une offre d'emploi
router.delete("/delete-ad/:id", AdController.DeleteAd);

export default router;
