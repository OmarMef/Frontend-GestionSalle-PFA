import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Reserver.css"; // tu peux créer un style similaire à Reserver.css
import { addUser } from "../Api/api";

function AjouterUtilisateur() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    username: "",
    password: "",
    CPassword: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Gestion du changement des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();


  // ✅ Vérification de chaque champ
  if (!formData.nom.trim()) {
    setMessage("❌ Le nom est obligatoire !");
    return;
  }
  if (!formData.prenom.trim()) {
    setMessage("❌ Le prénom est obligatoire !");
    return;
  }
  if (!formData.username.trim()) {
    setMessage("❌ L'e-mail/username est obligatoire !");
    return;
  }
  if (!formData.password) {
    setMessage("❌ Le mot de passe est obligatoire !");
    return;
  }
  if (!formData.CPassword) {
    setMessage("❌ La confirmation du mot de passe est obligatoire !");
    return;
  }

  // Vérification correspondance mot de passe
  if (formData.password !== formData.CPassword) {
    setMessage("❌ Les mots de passe ne correspondent pas !");
    return;
  }

    try {
        
        const response = await addUser({
    nom: formData.nom,
    prenom: formData.prenom,
    username: formData.username,
    password: formData.password,
    CPassword: formData.CPassword,
});
      setMessage("✅ Utilisateur ajouté avec succès !");
      console.log("Nouvel utilisateur :", response.data);

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        prenom: "",
        username: "",
        password: "",
        CPassword: "",
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
      {/* ✅ Bouton retour vers /fonctionnalite */}
      <div className="back-button">
        <Link to="/user" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="ajouter-card">
        <h1 className="reserver-title">Ajouter un utilisateur</h1>
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

          <label>Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>E-mail :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            name="CPassword"
            value={formData.CPassword}
            onChange={handleChange}
            className="ajouter-input"
            required
          />

          <label>Rôle :</label>
          <select name="roleId" value={formData.roleId} onChange={handleChange}>
            <option value={2}>USER</option> {/* seul rôle disponible */}
          </select>

          <button type="submit" className="reserver-button">
            Ajouter
          </button>
        </form>

        {message && <p className="ajouter-message">{message}</p>}
      </div>
    </div>
  );
}

export default AjouterUtilisateur;
