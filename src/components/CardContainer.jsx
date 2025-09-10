import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function CardContainer() {
  const navigate = useNavigate();
  const cardData = [
    { title: "Gestion des Réservations", description: "Gèrer vos Réservations , Ajout , Modification , Suppression", image: "/salle1.jpg" , path: "/reservation"},
    { title: "Gestion des Utilisateurs", description: "Gèrer vos Utilisateurs , Ajout , Modification , Suppression", image: "/user.png" , path: "/user"},
    { title: "Gestion des Salles", description: "Gèrer vos Salles , Ajout , Modification , Suppression", image: "/salle3.jpg" , path: "/salle"},
    { title: "Gestion des Equipements", description: "Gèrer vos Equipements , Ajout , Modification , Suppression", image: "/meuble.jpeg", path: "/equipement" },
    { title: "Historique des Réservations", description: "Garder une traçabilité de toutes vos transactions", image: "/dash.png", path: "/historique" },
  ];

  return (
    <div className="cards-container">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
          onClick={() => navigate(card.path)}
        />
      ))}
    </div>
  );
}

export default CardContainer;
