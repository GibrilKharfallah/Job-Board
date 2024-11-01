import Application from "../models/applicationSchema.js";

// POST : Soumettre une nouvelle candidature
export const SubmitApplication = async (req, res) => {
    const { jobId, applicantId, applicationDate } = req.body;
    try {
        const newApplication = await Application.create({
            applicantId,
            jobId,
            applicationDate,
        });
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la soumission de votre candidature",
        });
    }
};

// GET : Obtenir toutes les candidatures pour un utilisateur par son ID
export const GetApplicationsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const applications = await Application.findAll({
            where: { applicantId: id },
        });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la récupération des candidatures de l'utilisateur",
        });
    }
};

// GET : Obtenir toutes les candidatures pour une offre d'emploi spécifique par son ID
export const GetApplicationsByAdId = async (req, res) => {
    const { id } = req.params;
    try {
        const applications = await Application.findAll({
            where: { jobId: id },
        });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la récupération des candidatures pour l'offre d'emploi",
        });
    }
};

// GET : Obtenir toutes les candidatures
export const GetAllApplications = async (req, res) => {
    try {
        const applications = await Application.findAll();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la récupération des candidatures",
        });
    }
};

// DELETE : Supprimer une candidature par son ID
export const DeleteApplicationByAdId = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByPk(id);
        if (!application) {
            return res.status(404).json({ error: "Candidature non trouvée" });
        }
        await application.destroy();
        res.json({ message: "Candidature supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE : Supprimer toutes les candidatures pour une offre d'emploi spécifique
export const DeleteApplicationsByAdId = async (req, res) => {
    const { adId } = req.params;
    try {
        await Application.destroy({
            where: { jobId: adId },
        });
        res.status(200).json({
            message: "Toutes les candidatures pour cette offre ont été supprimées",
        });
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la suppression des candidatures pour cette offre d'emploi",
        });
    }
};

// PUT : Mettre à jour une candidature par son ID
export const UpdateApplicationById = async (req, res) => {
    const { id } = req.params;
    const { applicantId, jobId, applicationDate } = req.body;
    try {
        const application = await Application.findByPk(id);
        if (!application) {
            return res.status(404).json({ error: "Candidature non trouvée" });
        }
        await application.update({
            applicantId,
            jobId,
            applicationDate,
        });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la mise à jour de la candidature",
        });
    }
};
