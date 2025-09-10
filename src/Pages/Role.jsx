import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card"; // ton composant Card réutilisable
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Reservation.css"; // style similaire à Reservation.css

function Role() {
  const navigate = useNavigate();

  const roleCards = [
    {
      title: "Liste des rôles",
      description: "Consulter tous les rôles existants",
      image: "/roless.jpg",
      path: "/role/all",
    },
    {
      title: "Ajouter un rôle",
      description: "Créer un nouveau rôle pour les utilisateurs",
      image: "/addrole.png",
      path: "/role/add",
    },
    {
      title: "Attribuer un Role a un Utilisateur",
      description: "Attribuer un role existant a un utilisateur existant",
      image: "/role-user.jpg",
      path: "/role/to-user",
    },
        {
      title: "Retirer un Role d'un Utilisateur",
      description: "Attribuer un role existant a un utilisateur existant",
      image: "/delete.jpg",
      path: "/role/remove-user",
    },
  ];

  return (
    <div>
      <Navbar />

     <div className="reservation-back-button">
     <Link to="/user" className="back-link">
         <FaArrowLeft size={24} />
         <span>Retour</span>
     </Link>
     </div>


      <h1 style={{ textAlign: "center", marginTop: "30px", color: "#000000ff" }}>
        Gestion des Rôles
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Gérez vos rôles : Ajouter, Voir ou Modifier/Supprimer
      </p>

      <div className="cards-container">
        {roleCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Role;
