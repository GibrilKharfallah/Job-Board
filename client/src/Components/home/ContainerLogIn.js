import FooterSmall from "../../Pages/FooterSmall.js";
import HeaderSmall from "../../Pages/HeaderSmall.js";
import ContainerTagLine from "./ContainerTagLine.js";
import FormLogin from "./FormLogIn.js";

const ContainerLogIn = ({ triggerAnimation, toggleAuthView }) => {
    return (
        <article className="home__container">
            <HeaderSmall />
            <ContainerTagLine />
            <FormLogin triggerAnimation={triggerAnimation} toggleAuthView={toggleAuthView} />
            <FooterSmall />
        </article>
    );
};

export default ContainerLogIn;
