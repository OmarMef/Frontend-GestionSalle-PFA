import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { getCurrentUserRole } from "../Api/api";

function Equipement() {
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
    // Blocage de certaines pages si besoin selon le rôle
    if (path === "/equipement/add" || path === "/equipement/all" || path === "/equipement/to-salle") {
      if (userRole === "ADMIN") {
        navigate(path);
      } else {
        navigate("/access-denied");
      }
    } else {
      navigate(path);
    }
  };

  const equipementCards = [
    {
      title: "Liste des équipements",
      description: "Consulter tous les équipements disponibles avec leurs détails.",
      image: "/equipement.jpg",
      path: "/equipement/all",
    },
    {
      title: "Ajouter un équipement",
      description: "Créer un nouvel équipement et renseigner ses informations.",
      image: "/equipement3.jpg",
      path: "/equipement/add",
    },
    {
      title: "Equipements disponibles",
      description: "Voir la disponibilité des équipements.",
      image: "/equipement2.jpg",
      path: "/equipement/available",
    },
    {
      title: "Attribuer équipements à une Salle",
      description: "Attribuer un equipement a une salle.",
      image: "/equipement2.jpg",
      path: "/equipement/to-salle",
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
        Gestion des Équipements
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Gérez vos équipements : Voir, Ajouter ou Chercher les équipements disponibles
      </p>

      <div className="cards-container">
        {equipementCards.map((card, index) => (
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

export default Equipement;
