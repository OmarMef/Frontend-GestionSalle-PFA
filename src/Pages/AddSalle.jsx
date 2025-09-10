import React, { useState } from "react";
import { addSalle } from "../Api/api"; // ✅ à créer dans api.js
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Reserver.css";

function AddSalle() {
  const [salle, setSalle] = useState({
    nom: "",
    capacite: "",
    localisation: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSalle({ ...salle, [e.target.name]: e.target.value });
    setMessage(""); // reset message à chaque changement
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifications simples
    if (!salle.nom) return setMessage("❌ Nom de la salle manquant !");
    if (!salle.capacite || salle.capacite <= 0)
      return setMessage("❌ Capacité invalide !");
    if (!salle.localisation)
      return setMessage("❌ Localisation manquante !");

    try {
      await addSalle(salle); // API pour ajouter la salle
      setMessage("✅ Salle ajoutée avec succès !");
      // Reset formulaire
      setSalle({
        nom: "",
        capacite: "",
        localisation: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la salle :", error);
      setMessage("❌ Impossible d'ajouter la salle.");
    }
  };

  return (
    <div className="reserver-container">
      {/* Bouton retour */}
      <div className=".reserver-back-button">
        <Link to="/salle" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reserver-card">
        <h1 className="reserver-title">Ajouter une salle</h1>
        <form className="reserver-form" onSubmit={handleSubmit}>
          <label>Nom de la salle :</label>
          <input
            type="text"
            name="nom"
            value={salle.nom}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Capacité :</label>
          <input
            type="number"
            name="capacite"
            value={salle.capacite}
            onChange={handleChange}
            min="1"
            className="reserver-input"
          />

          <label>Localisation :</label>
          <input
            type="text"
            name="localisation"
            value={salle.localisation}
            onChange={handleChange}
            className="reserver-input"
          />

          <button type="submit" className="reserver-button">
            Ajouter
          </button>
        </form>

        {message && <p className="reserver-message">{message}</p>}
      </div>
    </div>
  );
}

export default AddSalle;
