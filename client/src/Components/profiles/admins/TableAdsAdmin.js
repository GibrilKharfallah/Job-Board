import React, { useState, useEffect } from "react";
import axios from "axios";
import TableAdsAdmin from ".//TableAdsAdmin";
import TableUsersAdmin from "./TableUsersAdmin";

const ProfileAdmin = () => {
    const [ads, setAds] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const token = JSON.parse(localStorage.getItem("user")).token;

    // Récupérer toutes les annonces
    const fetchAds = () => {
        axios
            .get("http://localhost:5000/ad/get-ads", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setAds(res.data);
            })
            .catch((error) => {
                console.error("Error fetching ads:", error);
                setMessage("Error fetching ads");
            });
    };

    // Récupérer tous les utilisateurs
    const fetchUsers = () => {
        axios
            .get("http://localhost:5000/people/get-users", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setMessage("Error fetching users");
            });
    };

    useEffect(() => {
        fetchAds();
        fetchUsers();
    }, []);

    return (
        <div className="profile-admin">
            {message && <p>{message}</p>}
            <TableAdsAdmin ads={ads} />
            <TableUsersAdmin users={users} setUsers={setUsers} />
        </div>
    );
};

export default ProfileAdmin;
