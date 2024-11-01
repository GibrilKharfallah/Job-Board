import express from "express";
import * as CompanyController from "../controllers/companyController.js";
import { verifyToken } from "../middleware/verifyTokens.js";

const router = express.Router();

// GET : récupérer tout les entreprises
router.get("/get-companies", CompanyController.GetAllCompanies);

// POST : Inscription d'un utilisateur (recruteur ou candidat)
router.post("/register", CompanyController.RegisterCompany);

// POST : Connexion d'un utilisateur
router.post("/login", CompanyController.LoginCompany);

// GET : Récupérer les informations d'un utilisateur par ID
router.get("/get-company/:id", CompanyController.GetCompanyById);

// PUT : Mettre à jour les informations d'une company'
router.put("/update-company/:id", CompanyController.UpdateCompany);

// Delete : Supprimer une company
router.delete("/:id", CompanyController.DeleteCompany);

export default router;
