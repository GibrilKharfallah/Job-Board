import { useState, useEffect } from "react";
import ContainerGraffic from "../Components/home/ContainerGraffic";
import Header from "../Pages/Header";
import Ads from "./Ads";
import ContainerLogIn from "../Components/home/ContainerLogIn";
import ContainerSignIn from "../Components/home/ContainerSignin";

const Home = () => {
    const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;

    const [animate, setAnimate] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const triggerAnimation = () => {
        setAnimate(!animate);
    };

    // Fonction pour alterner entre login et sign in quand l'écran est < 807px
    const toggleAuthView = () => {
            setShowLogin(!showLogin);
    };

    // Gérer la détection de la taille d'écran
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Nettoyage de l'événement lors du démontage du composant
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {!token && (
                <>
                    {screenWidth > 807 && <ContainerGraffic animate={animate} />}
                    <section className="home">
                        {screenWidth < 807 ? (
                            showLogin ? (
                                <ContainerLogIn triggerAnimation={triggerAnimation} toggleAuthView={toggleAuthView} />
                            ) : (
                                <ContainerSignIn triggerAnimation={triggerAnimation} toggleAuthView={toggleAuthView} />
                            )
                        ) : (
                            <>
                                <ContainerSignIn triggerAnimation={triggerAnimation} toggleAuthView={toggleAuthView}/>
                                <ContainerLogIn triggerAnimation={triggerAnimation} toggleAuthView={toggleAuthView}/>
                            </>
                        )}
                    </section>
                </>
            )}
            <Header />
            <Ads />
        </>
    );
};

export default Home;
