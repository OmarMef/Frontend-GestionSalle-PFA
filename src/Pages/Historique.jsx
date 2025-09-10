import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { getCurrentUserRole } from "../Api/api";

function Historique() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getCurrentUserRole();
      setUserRole(role); // "ADMIN", "USER", "RESPONSABLE"
    };
    fetchRole();
  }, []);

  const handleCardClick = (path) => {
    // Blocage de l'accès à certaines pages selon le rôle
    if (path === "/historique/all" || path === "/historique/action" || path === "/historique/graphe"){
      if (userRole === "ADMIN") {
        navigate(path);
      } else {
        navigate("/access-denied"); // redirection si non-admin
      }
    } else {
      navigate(path); // toutes les autres pages accessibles
    }
  };

  const historiqueCards = [
    {
      title: "Historique de toutes les Réservations",
      description: "Consultez toutes les réservations effectuées.",
      image: "/hist1.jpg",
      path: "/historique/all",
    },
    {
      title: "Historique de mes Réservations",
      description: "Suivez l’activité des utilisateurs.",
      image: "/hist2.jpg",
      path: "/historique/user",
    },
    {
      title: "Historique Selon le Status de la Réservation",
      description: "Chercher l'historique selon le status de la réservation",
      image: "/hist3.jpg",
      path: "/historique/action",
    },
    {
      title: "Dashbord Analytique",
      description: "Graphe qui affiche les utilisateurs les plus actifs , les salles et les actions les plus utiliser",
      image: "/graphe.jpg",
      path: "/historique/graphe",
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
        Gestion de l’Historique
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Consultez les historiques des réservations, des utilisateurs et des salles
      </p>

      <div className="cards-container">
        {historiqueCards.map((card, index) => (
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

export default Historique;
