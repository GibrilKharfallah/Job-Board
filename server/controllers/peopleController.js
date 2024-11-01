import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Conserver l'importation
import People from "../models/peopleSchema.js";

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function checkPassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

async function checkEmail(email) {
    try {
        const user = await People.findOne({
            where: { email: email },
        });
        return !!user;
    } catch (error) {
        console.log(error);
    }
}

export const GetAllUsers = async (req, res) => {
    try {
        const users = await People.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const RegisterPeople = async (req, res) => {
    const { name, firstname, city, region, email, password } = req.body;

    if (await checkEmail(email)) {
        return res.status(400).json({
            message: "Error: email already used",
        });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await People.create({
            name,
            firstname,
            email,
            password: hashedPassword,
            city,
            region,
        });
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const UpdatePeople = async (req, res) => {
    const id = req.params.id;
    const { firstname, name, city, region, email } = req.body;
    try {
        const updatedPeople = await People.update(
            {
                firstname,
                name,
                city,
                region,
                email,
            },
            { where: { id } }
        );
        if (updatedPeople[0] === 0) {
            return res.status(404).json({
                error: "Utilisateur non trouvé",
                message: "Error updating: Utilisateur non trouvé",
            });
        }
        res.json(updatedPeople);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error updating: " + error.message,
        });
    }
};

const SECRET_KEY = process.env.JWT_SECRET;

export const LoginPeople = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await People.findOne({ where: { email } });

        if (!user || !(await checkPassword(password, user.password))) {
            return res.status(401).json({
                error: "Utilisateur ou mot de passe incorrect",
                message: "Utilisateur ou mot de passe incorrect",
            });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: "1h",
        });

        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        userWithoutPassword.userType = "people";
        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const GetPeopleById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await People.findByPk(id);
        if (!user) {
            return res.status(404).json({
                error: "Utilisateur non trouvé",
                message: "Error: Utilisateur non trouvé",
            });
        }
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const DeletePeopleById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await People.findByPk(id);
        if (!user) {
            return res.status(404).json({
                error: "Utilisateur non trouvé",
                message: "Utilisateur non trouvé",
            });
        }
        await user.destroy();
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};

export const UpdateAdminById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await People.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        await user.update({ admin: true });
        res.json({
            message: "Utilisateur administrateur mis à jour avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error: " + error.message,
        });
    }
};
