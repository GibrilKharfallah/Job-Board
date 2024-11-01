import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import de useParams

const FormUpdatePeople = () => {
    const { id } = useParams(); // Récupère l'ID depuis les paramètres de l'URL
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [message, setMessage] = useState("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const userId = storedUser?.user?.id;
    const isAdmin = storedUser?.user?.isAdmin;

    const effectiveId = isAdmin ? id : userId; // Utilise l'ID de useParams si admin, sinon l'ID du token

    // Appel de l'API pour récupérer les infos de l'utilisateur
    useEffect(() => {
        const fetchUserInfo = () => {
            axios
                .get(`http://localhost:5000/people/get-people/${effectiveId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data);
                    setEmail(res.data.email);
                    setName(res.data.name);
                    setFirstname(res.data.firstname);
                    setCity(res.data.city);
                    setRegion(res.data.region);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des informations utilisateur :", error);
                    setMessage(
                        "Erreur lors de la récupération des informations utilisateur"
                    );
                });
        };

        if (token && effectiveId) {
            fetchUserInfo();
        }
    }, [token, effectiveId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "name":
                setName(value);
                break;
            case "firstname":
                setFirstname(value);
                break;
            case "city":
                setCity(value);
                break;
            case "region":
                setRegion(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name,
            firstname,
            email,
            city,
            region,
        };

        axios
            .put(`http://localhost:5000/people/update-people/${effectiveId}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
                setMessage("Profil mis à jour avec succès");
            })
            .catch((err) => {
                setMessage("Erreur lors de la mise à jour du profil");
                console.error(err);
            });
    };

    return (
        <article className="home__container--sign-in">
            {message && <span className="error-message">{message}</span>}
            <form
                className="home__container--sign-in__form"
                method="post"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email} // Utilisation de la valeur d'état
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={name} // Utilisation de la valeur d'état
                    id="name"
                    name="name"
                    placeholder="Nom"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={firstname} // Utilisation de la valeur d'état
                    id="firstname"
                    name="firstname"
                    placeholder="Prénom"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={city} // Utilisation de la valeur d'état
                    id="city"
                    name="city"
                    placeholder="Ville"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={region} // Utilisation de la valeur d'état
                    id="region"
                    name="region"
                    placeholder="Région"
                    required
                    onChange={handleChange}
                />
                <div className="home__container--sign-in__form__btns">
                    <button type="submit">Mettre à jour</button>
                </div>
            </form>
        </article>
    );
};

export default FormUpdatePeople;
