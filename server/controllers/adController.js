import Advertisement from "../models/advertisementSchema.js";
import Company from "../models/companySchema.js";  // Assure-toi que le chemin est correct

export const GetAllAds = async (req, res) => {
    try {
        const jobs = await Advertisement.findAll();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la récupération des annonces",
        });
    }
};

export const GetAdById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Advertisement.findByPk(id);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ error: "Offre d'emploi non trouvée" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la récupération de l'offre d'emploi",
        });
    }
};

export const GetAdByCompanyId = async (req, res) => {
    const { id } = req.params;  
    try {
        const jobs = await Advertisement.findAll({
            where: {
                companyId: id, 
            },
        });
        if (jobs.length > 0) {
            res.status(200).json(jobs);
        } else {
            res.status(404).json({
                error: "Aucune offre d'emploi trouvée pour cette entreprise",
            });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des offres d'emploi :", error);
        res.status(500).json({
            error: "Erreur lors de la récupération des offres d'emploi pour cette entreprise",
        });
    }
};


export const AdminGetAdByCompanyId = async (req, res) => {
    const { id } = req.params;

    try {
        const jobs = await Advertisement.findAll({
            where: {
                companyId: id,
            },
        });

        if (jobs.length > 0) {
            res.status(200).json(jobs);
        } else {
            res.status(404).json({
                error: "Aucune offre d'emploi trouvée pour cette entreprise",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la récupération des offres d'emploi pour cette entreprise",
        });
    }
};
export const CreateAd = async (req, res) => {
    const {
        title,
        description,
        contractType,
        sector,
        city,
        region,
        companyId,
        wage,
        startingDate,
        expiringDate,
    } = req.body;

    try {
       
        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ error: "Entreprise non trouvée" });
        }

        const newJob = await Advertisement.create({
            title,
            description,
            contractType,
            sector,
            city,
            region,
            companyId: company.id, 
            wage,
            startingDate,
            expiringDate,
        });

        res.status(201).json(newJob);
    } catch (error) {
        console.error("Erreur lors de la création de l'offre d'emploi:", error);
        res.status(500).json({
            error: "Erreur lors de la création de l'offre d'emploi",
            message: error.message,
        });
    }
};

export const UpdateAd = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        contractType,
        sector,
        city,
        region,
        wage,
        companyId,
        startingDate,
        expiringDate,
    } = req.body;

    try {
        const job = await Advertisement.findByPk(id);
        if (job) {
            await job.update({
                title,
                description,
                contractType,
                sector,
                city,
                region,
                wage,
                companyId,
                startingDate,
                expiringDate,
            });
            res.status(200).json(job);
        } else {
            res.status(404).json({ error: "Offre d'emploi non trouvée" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la mise à jour de l'offre d'emploi",
        });
    }
};

export const DeleteAd = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Advertisement.findByPk(id);
        if (job) {
            await job.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Offre d'emploi non trouvée" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la suppression de l'offre d'emploi",
        });
    }
};
