import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormLogin = ({ triggerAnimation, toggleAuthView }) => {
    const [typeUser, setTypeUser] = useState("no-user-type");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "user-type") {
            setTypeUser(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeUser === "no-user-type") {
            return setMessage("Veuillez sélectionner votre catégorie");
        }

        let dataForm = {
            email: email,
            password: password,
        };

        axios
            .post(`${process.env.REACT_APP_HOST}/${typeUser}/login`, dataForm)
            .then((res) => {
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
                if (res.data.token) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    navigate("/");
                    window.location.reload();
                }
            })
            .catch((err) => {
                setMessage("Erreur lors de la connexion");
                console.error(err);
            });
    };

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <form
                className="home__container--log-in__form"
                method="post"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <label htmlFor="no-user-type">Choose your type :</label>
                <select
                    value={typeUser}
                    name="user-type"
                    id="no-user-type"
                    className="home__container--sign-in__form__select--user-type"
                    onChange={handleChange}
                >
                    <option value="">Please choose an option</option>
                    <option value="company">Company</option>
                    <option value="people">Applicant</option>
                </select>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                />
                <div className="home__container--log-in__form__btns">
                    <button type="submit">Log in</button>
                    <button
                        onClick={() => {
                            triggerAnimation();
                            toggleAuthView();
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormLogin;
