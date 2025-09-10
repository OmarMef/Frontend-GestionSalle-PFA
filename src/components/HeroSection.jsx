/*import React from "react";

function HeroSection() {
  return (
    <section style={{ 
      height: "80vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "#61dafb", 
      color: "#282c34", 
      textAlign: "center",
      padding: "0 1rem"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Bienvenue sur MonSite !</h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "600px" }}>
        Cette plateforme vous permet de gérer facilement vos réservations et vos contenus.
      </p>
      <button style={{ marginTop: "2rem", padding: "0.8rem 2rem", fontSize: "1rem", borderRadius: "5px", border: "none", backgroundColor: "#282c34", color: "#fff", cursor: "pointer" }}>
        Commencer
      </button>
    </section>
  );
}

export default HeroSection;
*/

import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/fonctionnalite");
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Bienvenue sur l'application de Gestion et de Réservation de Salle</h1>
          <p>Accédez à toutes vos fonctionnalités rapidement et facilement.</p>
          <button className="hero-button" onClick={handleClick}>
            Commencer
          </button>
        </div>
      </div>
    </section>
  );
}
