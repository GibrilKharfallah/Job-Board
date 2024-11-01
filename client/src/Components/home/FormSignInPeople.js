import { useState } from "react";
import axios from "axios";

const FormSignInPeople = ({ triggerAnimation, toggleAuthView }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "firstname") {
            setFirstname(e.target.value);
        } else if (e.target.name === "city") {
            setCity(e.target.value);
        } else if (e.target.name === "region") {
            setRegion(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "confirmed_password") {
            setConfirmedPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name,
            firstname,
            email,
            password,
            city,
            region,
        };

        if (password === confirmedPassword) {
            return axios
                .post(`${process.env.REACT_APP_HOST}/people/register`, data)
                .then((res) => {
                    if (res.data.message) {
                        return setMessage(res.data.message);
                    }
                })
                .catch((err) => {
                    setMessage("Erreur lors de la connexion");
                    console.error(err);
                });
        } else {
            setMessage("Veuillez confirmer votre mot de passe");
        }
    };

    return (
        <article className="home__container--sign-in">
            {message && <span className="error-message">{message}</span>}
            <form
                className="home__container--sign-in__form"
                method="post"
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Firstname"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="region"
                    name="region"
                    placeholder="Region"
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
                <input
                    type="password"
                    id="confirmed_password"
                    name="confirmed_password"
                    placeholder="Enter your password again"
                    required
                    onChange={handleChange}
                />
                <div className="home__container--sign-in__form__btns">
                    <button type="submit">Sign in</button>
                    <button  href="" id="home__graffic--animation" 
                        onClick={() => {
                            triggerAnimation();
                            toggleAuthView();
                        }}
                    >
                        Log in
                    </button>
                </div>
            </form>
        </article>
    );
};

export default FormSignInPeople;
