import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./AddUser.css"; // ✅ même CSS que les autres formulaires
import { addRole } from "../Api/api";

function AddRole() {
  const [formData, setFormData] = useState({
    nomRole: "",
    desc: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifications basiques
    if (!formData.nomRole.trim()) {
      setMessage("❌ Le nom du rôle est obligatoire !");
      return;
    }
    if (!formData.desc.trim()) {
      setMessage("❌ La description est obligatoire !");
      return;
    }

    try {
      const response = await addRole({
        nomRole: formData.nomRole,
        desc: formData.desc,
      });
      setMessage("✅ Rôle ajouté avec succès !");
      console.log("Nouveau rôle :", response.data);

      // Réinitialiser le formulaire
      setFormData({
        nomRole: "",
        desc: "",
      });
    } catch (error) {
      if (error.response) {
        console.error("Status :", error.response.status);
        console.error("Data :", error.response.data);
        setMessage(
          `❌ Erreur ${error.response.status} : ${JSON.stringify(error.response.data)}`
        );
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
      {/* ✅ Bouton retour vers /role */}
      <div className="back-button">
        <Link to="/user/role" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reserver-card">
        <h1 className="reserver-title">Ajouter un rôle</h1>
        <form className="ajouter-form" onSubmit={handleSubmit}>
          <label>Nom du rôle :</label>
          <input
            type="text"
            name="nomRole"
            value={formData.nomRole}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>Description :</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="ajouter-input"
            rows="4"
            required
          ></textarea>

          <button type="submit" className="reserver-button">
            Ajouter
          </button>
        </form>

        {message && <p className="ajouter-message">{message}</p>}
      </div>
    </div>
  );
}

export default AddRole;
