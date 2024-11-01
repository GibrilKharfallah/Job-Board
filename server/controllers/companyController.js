import bcrypt from "bcrypt";
import Company from "../models/companySchema.js";
import jwt from "jsonwebtoken";

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function checkPassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}

async function checkEmail(email) {
    try {
        const user = await Company.findOne({ where: { email: email } });
        return !!user;
    } catch (error) {
        console.log(error);
    }
}

export const GetAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const RegisterCompany = async (req, res) => {
    const { name, password, email, city, region } = req.body;

    if (await checkEmail(email)) {
        return res.status(400).json({
            message: "Email already used",
            error: "Email already used!",
        });
    }

    try {
        const hashedPassword = await hashPassword(password);

        const newCompany = await Company.create({
            name,
            password: hashedPassword,
            email,
            city,
            region,
        });
        res.status(201).json({
            message: "Compte créé avec succès!",
            company: newCompany,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const UpdateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, email, city, region } = req.body;
    try {
        const updatedCompany = await Company.update(
            {
                name,
                email,
                city,
                region,
            },
            { where: { id } }
        );
        if (updatedCompany[0] === 0) {
            return res.status(404).json({ error: "Entreprise non trouvée" });
        }
        res.json(updatedCompany);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const GetCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Company.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Entreprise non trouvée" });
        }
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error get-company " + error.message,
        });
    }
};

export const DeleteCompany = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCompany = await Company.destroy({
            where: {
                id_company: id,
            },
        });
        if (deletedCompany === 0) {
            return res.status(404).json({
                error: "Entreprise non trouvée",
                message: "Entreprise non trouvée",
            });
        }
        res.json({ message: "Entreprise supprimée avec succès" });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error delete-company " + error.message,
        });
    }
};

const SECRET_KEY = process.env.JWT_SECRET;

export const LoginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Company.findOne({ where: { email } });

        if (!user || !(await checkPassword(password, user.password))) {
            return res.status(401).json({
                error: "Email ou mot de passe incorrect",
                message: "Error: Email ou mot de passe incorrect",
            });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: "1h",
        });
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        userWithoutPassword.userType = "company";
        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: error.message, message: error.message });
    }
};
