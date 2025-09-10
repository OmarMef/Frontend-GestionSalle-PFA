import React from "react";
import "./Card.css";

function Card({ title, description, image, onClick }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={onClick}>Voir plus</button>
      </div>
    </div>
  );
}

export default Card;
