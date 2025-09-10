import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { getCurrentUserRole } from "../Api/api";
import { useState, useEffect } from "react";

function Salle() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
  const fetchRole = async () => {
    const role = await getCurrentUserRole();
    setUserRole(role); // "ADMIN", "USER" ou "RESPONSABLE"
  };
  fetchRole();
}, []);

  const handleCardClick = (path) => {
    // Blocage de l'accès à certaines pages selon le rôle
    if (path === "/salle/all" || path === "/salle/addSalle") {
      if (userRole === "ADMIN") {
        navigate(path);
      } else {
        navigate("/access-denied"); // redirection si non-admin
      }
    } else {
      navigate(path); // toutes les autres pages accessibles
    }
  };


  const salleCards = [
    {
      title: "Liste des salles",
      description: "Consulter toutes les salles disponibles avec leurs détails.",
      image: "/salle1.jpg", // 👉 tu peux changer l’image plus tard
      path: "/salle/all",
    },
    {
      title: "Ajouter une salle",
      description: "Créer une nouvelle salle en renseignant ses informations.",
      image: "/salle2.jpg",
      path: "/salle/addSalle",
    },
    {
      title: "Chercher les Salle Disponible",
      description: "Faire une recherche concernant les salle libres",
      image: "/salle3.jpg",
      path: "/salle/available",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="reservation-back-button">
        <Link to="/fonctionnalite" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1 style={{ textAlign: "center", marginTop: "30px", color: "#000000ff" }}>
        Gestion des Salles
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Gérez vos salles : Voir, Ajouter ou Modifier leurs informations
      </p>

      <div className="cards-container">
        {salleCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            onClick={() => handleCardClick(card.path)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Salle;
