import express from "express";
import * as PeopleController from "../controllers/peopleController.js";
import { verifyToken } from "../middleware/verifyTokens.js";

const router = express.Router();

// GET : récupérer tout les utilisateurs
router.get("/get-peoples", PeopleController.GetAllUsers);

// POST : Inscription d'un utilisateur (candidat)
router.post("/register", PeopleController.RegisterPeople);

// POST : Connexion d'un utilisateur
router.post("/login", PeopleController.LoginPeople);

// GET : Récupérer les informations d'un utilisateur par ID
router.get("/get-people/:id", PeopleController.GetPeopleById);

// PUT : Mettre à jour les informations d'un utilisateur
router.put("/update-people/:id", PeopleController.UpdatePeople);

// DELETE : Delete un user
router.delete("/delete-people/:id", PeopleController.DeletePeopleById);

export default router;
