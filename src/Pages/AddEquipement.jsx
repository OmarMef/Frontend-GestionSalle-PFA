import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Reserver.css"; // on peut réutiliser le CSS existant
import { addEquipement } from "../Api/api"; // à créer dans api.js

function AddEquipement() {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    quantite: "",
  });

  const [message, setMessage] = useState("");

  // Gestion du changement des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs
    if (!formData.nom.trim()) {
      setMessage("❌ Le nom est obligatoire !");
      return;
    }
    if (!formData.description.trim()) {
      setMessage("❌ La description est obligatoire !");
      return;
    }
    if (!formData.quantite || parseInt(formData.quantite) < 0) {
      setMessage("❌ La quantité doit être un nombre positif !");
      return;
    }

    try {
      const response = await addEquipement({
        nom: formData.nom,
        description: formData.description,
        quantite: parseInt(formData.quantite),
      });
      setMessage("✅ Équipement ajouté avec succès !");
      console.log("Nouvel équipement :", response.data);

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        description: "",
        quantite: "",
      });
    } catch (error) {
      if (error.response) {
        console.error("Status :", error.response.status);
        console.error("Data :", error.response.data);
        setMessage(`❌ Erreur ${error.response.status} : ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error("Request :", error.request);
        setMessage("❌ Aucune réponse du serveur");
      } else {
        console.error("Erreur Axios :", error.message);
        setMessage(`❌ Erreur Axios : ${error.message}`);
      }
    }
  };

  return (
    <div className="reserver-container">
      {/* Bouton retour vers la liste des équipements */}
      <div className="back-button">
        <Link to="/equipement" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="ajouter-card">
        <h1 className="reserver-title">Ajouter un équipement</h1>
        <form className="reserver-form" onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>Quantité :</label>
          <input
            type="number"
            name="quantite"
            value={formData.quantite}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <button type="submit" className="reserver-button">
            Ajouter
          </button>
        </form>

        {message && <p className="ajouter-message">{message}</p>}
      </div>
    </div>
  );
}

export default AddEquipement;
