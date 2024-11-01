const button1 = document.querySelector(".home__graffic--animation");

button1.addEventListener("click", (e) => {
    const homeGraffic = document.querySelector(".home__graffic--left");
    homeGraffic.classList.toggle("home__graffic--right");
});

const button2 = document.querySelector("#home__graffic--animation");

button2.addEventListener("click", (e) => {
    const homeGraffic = document.querySelector(".home__graffic--left");
    homeGraffic.classList.toggle("home__graffic--right");
});