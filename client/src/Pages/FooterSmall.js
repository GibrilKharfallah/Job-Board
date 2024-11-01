import { Link } from "react-router-dom";

const FooterSmall = () => {
    return (
        <nav className="home__container__nav--sn">
            <p>Follow us!</p>
            <Link to="/icon-x">
                <img src="/assets/img/icon-x.png" alt="Icon X" />
            </Link>
            <Link to="/tiktok">
                <img
                    src="/assets/img/icon-tiktok.png"
                    alt="Icon Tiktok"
                />
            </Link>
            <Link to="/instagram">
                <img
                    src="/assets/img/icon-instagram.png"
                    alt="Icon Instagram"
                />
            </Link>
        </nav>
    );
};

export default FooterSmall;
