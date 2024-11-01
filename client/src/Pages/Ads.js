import { useState, useEffect } from "react";
import axios from "axios";
import FormFilterAds from "../Components/ads/FormFilterAds";
import CardsAds from "../Components/ads/CardsAds";
import ReactPaginate from "react-paginate";

const Ads = () => {
    const [ads, setAds] = useState([]); // Stocke les annonces récupérées
    const [search, setSearch] = useState(""); // Stocke la valeur de la recherche
    const [filteredAds, setFilteredAds] = useState([]); // Stocke les annonces filtrées
    const [currentPage, setCurrentPage] = useState(0); // Page actuelle
    const adsPerPage = 8; // Nombre d'annonces par page

    // Effectuer la requête pour récupérer toutes les annonces
    useEffect(() => {
        axios
            .get("http://localhost:5000/ad/get-ads")
            .then((response) => {
                setAds(response.data);
                setFilteredAds(response.data); // Initialement, toutes les annonces sont visibles
            })
            .catch((error) => {
                console.error("Error fetching ads:", error);
            });
    }, []);

    // Filtrer les annonces en fonction de la recherche
    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        if (searchTerm.trim() === "") {
            setFilteredAds(ads);
        } else {
            const filtered = ads.filter((ad) => {
                const {
                    title,
                    description,
                    city,
                    region,
                    contractType,
                    sector,
                    wage,
                } = ad;

                return (
                    title.toLowerCase().includes(searchTerm) ||
                    description.toLowerCase().includes(searchTerm) ||
                    city.toLowerCase().includes(searchTerm) ||
                    region.toLowerCase().includes(searchTerm) ||
                    contractType.toLowerCase().includes(searchTerm) ||
                    sector.toLowerCase().includes(searchTerm) ||
                    wage.toString().includes(searchTerm)
                );
            });

            setFilteredAds(filtered);
        }
    };

    // Gérer le changement de page
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    // Calculer l'index des annonces à afficher
    const offset = currentPage * adsPerPage;
    const currentAds = filteredAds.slice(offset, offset + adsPerPage);
    const pageCount = Math.ceil(filteredAds.length / adsPerPage);

    return (
        <section className="jobs">
            <h3>Your dreamed job is waiting for you</h3>
            <h1>
                Search and <strong>discover</strong> your job here
            </h1>
            <FormFilterAds search={search} handleChange={handleChange} />
            <CardsAds ads={currentAds} />
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </section>
    );
};

export default Ads;
