import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProfileCompany from "./Pages/ProfileCompany";
import ProfilePeople from "./Pages/ProfilePeople";
import ProfileAdmin from "./Pages/ProfileAdmin"; // Importer ProfileAdmin
import ErrorLogin from "./Pages/ErrorLogin";
import ErrorPage from "./Pages/ErrorPage";
import Ad from "./Pages/Ad";

function App() {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const user = storedData ? storedData.user : null;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/profile"
                    element={
                        user ? (
                            user.isAdmin ? (
                                <ProfileAdmin />
                            ) : user.userType === "company" ? (
                                <ProfileCompany />
                            ) : (
                                <ProfilePeople />
                            )
                        ) : (
                            <ErrorLogin />
                        )
                    }
                />
                <Route path="/profile/company/:id" element={<ProfileCompany />} /> {/* Nouvelle route pour les entreprises */}
                <Route path="/profile/people/:id" element={<ProfilePeople />} /> {/* Nouvelle route pour les personnes */}
                <Route path="/ad/:id" element={<Ad />} /> {/* Nouvelle route pour les détails des annonces */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;