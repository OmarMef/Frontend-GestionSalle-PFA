import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { getCurrentUserRole } from "../Api/api";

function User() {
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
    if (path === "/user/role" || path === "/user/all") {
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

  const userCards = [
    {
      title: "Liste des utilisateurs",
      description: "Consulter et gérer tous les utilisateurs inscrits.",
      image: "/users.webp",
      path: "/user/all",
    },
    {
      title: "Ajouter un utilisateur",
      description: "Créer un nouvel utilisateur avec ses informations.",
      image: "/user.webp",
      path: "/user/addUser",
    },
    {
      title: "Gestion des rôles",
      description: "Définir et attribuer des rôles aux utilisateurs.",
      image: "/role.webp",
      path: "/user/role",
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
        Gestion des Utilisateurs
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Gérez vos utilisateurs : Voir, Ajouter ou Modifier leurs rôles
      </p>

      <div className="cards-container">
        {userCards.map((card, index) => (
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

export default User;
