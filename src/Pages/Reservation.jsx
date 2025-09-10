import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ton composant Card réutilisé
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getCurrentUserRole } from "../Api/api";
import "./Reservation.css"

function Reservation() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getCurrentUserRole();
      setUserRole(role); // "ADMIN", "USER" ou "RESPONSABLE"
    };
    fetchRole();
  }, []);

  const handleCardClick = async (path) => {
    if (path === "/list-reservations") {
      // Vérification du rôle pour la gestion des rôles
      if (userRole === "ADMIN") {
        navigate(path);
      } else {
        navigate("/access-denied"); // redirection si non-admin
      }
    } else {
      navigate(path);
    }
  };
  

  const reservationCards = [
    {
      title: "Liste des Réservations",
      description: "Consulter toutes vos réservations avec option de Modification ou de Suppression",
      image: "/salle1.jpg",
      path: "/list-reservations",
    },
    {
      title: "Réserver une Salle",
      description: "Créer une Réservation",
      image: "/salle2.jpg",
      path: "/reserver",
    },
    {
      title: "Voir mes Réservations",
      description: "Consulter vos propres réservations",
      image: "/salle3.jpg",
      path: "/mes-reservations",
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
        Gestion des Réservations
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Gérez vos réservations : Ajouter, Voir ou Modifier/Annuler
      </p>

      <div className="cards-container">
        {reservationCards.map((card, index) => (
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

export default Reservation;
