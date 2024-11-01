import { NavLink } from "react-router-dom";

const HeaderSmall = () => {
    return (
        <nav class="home__container__nav--cats">
            <ul>
                <NavLink to="/about-us">
                    <li>About us</li>
                </NavLink>
                <NavLink to="/q-a">
                    <li>Q&A</li>
                </NavLink>
                <NavLink to="/contact-us">
                    <li>Contact us</li>
                </NavLink>
            </ul>
        </nav>
    );
};

export default HeaderSmall;