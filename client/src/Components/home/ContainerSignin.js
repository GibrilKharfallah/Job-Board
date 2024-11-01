import { useState } from "react";
import HeaderSmall from "../../Pages/HeaderSmall.js";
import FormSignInPeople from "./FormSignInPeople";
import FormSignInCompany from "./FormSignInCompany";
import FooterSmall from "../../Pages/FooterSmall.js";

const ContainerSignIn = ({ triggerAnimation, toggleAuthView  }) => {
    const [typeUser, setTypeUser] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "user-type") {
            setTypeUser(e.target.value);
        }
    };

    return (
        <article className="home__container">
            <HeaderSmall />
            <article className="home__container--sign-in">
                <form className="home__container--sign-in__form" method="post">
                    <label htmlFor="user-type-select">Choose your type :</label>
                    <select
                        value={typeUser}
                        name="user-type"
                        id="user-type-select"
                        className="home__container--sign-in__form__select--user-type"
                        onChange={handleChange}
                    >
                        <option value="">Please choose an option</option>
                        <option value="company">Company</option>
                        <option value="people">Applicant</option>
                    </select>
                </form>
                <section className="home__container--content">
                    {typeUser === "people" ? (
                        <FormSignInPeople triggerAnimation={triggerAnimation}  toggleAuthView={toggleAuthView}/>
                    ) : typeUser === "company" ? (
                        <FormSignInCompany triggerAnimation={triggerAnimation}  toggleAuthView={toggleAuthView} />
                    ) : (
                        ""
                    )}
                </section>
            </article>
            <FooterSmall />
        </article>
    );
};

export default ContainerSignIn;
