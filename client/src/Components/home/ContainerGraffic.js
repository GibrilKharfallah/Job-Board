const ContainerGraffic = ({ animate }) => {
    return (
        <article className={`home__graffic ${animate ? "home__graffic--right" : "home__graffic--left"}`}>
            <section className="home__graffic--bg home__graffic--bg-1"></section>
            <section className="home__graffic--bg home__graffic--bg-2"></section>
            <section className="home__graffic--bg home__graffic--bg-3"></section>
            <section className="home__graffic--bg home__graffic--bg-4"></section>
        </article>
    );
};

export default ContainerGraffic;
