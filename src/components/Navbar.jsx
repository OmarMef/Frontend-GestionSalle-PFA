
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ username: "Invité" });
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie que la session existe et récupère l'utilisateur connecté
    axios.get("http://localhost:8082/user/me", { withCredentials: true })
      .then(res => {
        if (res.data && res.data.username) {
          setUser(res.data); // Met à jour le nom d'utilisateur
        }
      })
      .catch(err => {
        console.log("Utilisateur non connecté", err);
        setUser({ username: "Invité" }); // fallback si non connecté
      });
  }, []);

  const handleMenuClick = () => setMenuOpen(!menuOpen);
  const goTo = (path) => {setMenuOpen(false);navigate(path);
  
  };


  return (
    <nav className="navbar">
      {/* Icône Menu */}
      <div className="nav-left">
        <button onClick={handleMenuClick} className="icon-button">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Logo centré */}
      <div className="nav-center">
        <img src="/emsi.png" alt="Logo EMSI" className="logo" />
      </div>

      {/* Icône Profil + Nom */}
      <div className="nav-right">
        <button onClick={() => goTo("/profil")} className="icon-button">
          <i className="fas fa-user-circle"></i>
        </button>
        <span className="username">{user.username}</span>
      </div>

      {/* Sidebar */}
      {menuOpen && (
        <div className="sidebar">
          <ul>

             <li onClick={() => goTo("/home")}>Home</li>
             <li onClick={() => goTo("/fonctionnalite")}>Dashbord</li>
            <li onClick={() => goTo("/reservation")}>Réservations</li>
            <li onClick={() => goTo("/user")}>Utilisateurs</li>
            <li onClick={() => goTo("/salle")}>Salles</li>
            <li onClick={() => goTo("/equipement")}>Équipement</li>
            <li onClick={() => goTo("/historique")}>Historique</li>
            <li
              onClick={() => window.location.href = "http://localhost:8082/logout"} 
              style={{ color: "red", fontWeight: "bold" }}>
              Déconnexion
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
}


