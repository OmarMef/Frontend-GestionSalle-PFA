import React, { useState, useEffect } from "react";
import { attribuerEquipement } from "../Api/api";
import { getAllEquipements } from "../Api/api";
import { getAllSalles } from "../Api/api"; // à créer pour récupérer toutes les salles
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AddUser.css";

function AttribuerEquipement() {
  const [equipements, setEquipements] = useState([]);
  const [salles, setSalles] = useState([]);
  const [formData, setFormData] = useState({
    equipementId: "",
    salleId: "",
    quantite: 1,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setEquipements(await getAllEquipements());
      setSalles(await getAllSalles());
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await attribuerEquipement(formData);
    setMessage("✅ Équipement attribué avec succès !");
    setFormData({ equipementId: "", salleId: "", quantite: 1 });
  } catch (error) {
    // Vérifie si c'est une erreur Axios avec réponse du serveur
    if (error.response && error.response.data) {
      // Si le backend renvoie un objet avec "message"
      if (typeof error.response.data === "string") {
        setMessage(`❌ Erreur : ${error.response.data}`);
      } else if (error.response.data.message) {
        setMessage(`❌ Erreur : ${error.response.data.message}`);
      } else {
        setMessage(`❌ Erreur : ${JSON.stringify(error.response.data)}`);
      }
    } else {
      // Autres types d'erreur (réseau, Axios, etc.)
      setMessage(`❌ Erreur : ${error.message}`);
    }
  }
};
  return (
    <div className="reserver-container">
      <div className="back-button">
        <Link to="/equipement" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reserver-card">
        <h1 className="reserver-title">Attribuer un équipement à une salle</h1>
        <form className="ajouter-form" onSubmit={handleSubmit}>
          <label>Équipement :</label>
          <select name="equipementId" value={formData.equipementId} onChange={handleChange} required>
            <option value="">-- Sélectionner --</option>
            {equipements.map((e) => (
              <option key={e.id} value={e.id}>{e.nom}</option>
            ))}
          </select>

          <label>Salle :</label>
          <select name="salleId" value={formData.salleId} onChange={handleChange} required>
            <option value="">-- Sélectionner --</option>
            {salles.map((s) => (
              <option key={s.id} value={s.id}>{s.nom}</option>
            ))}
          </select>

          <label>Quantité :</label>
          <input type="number" name="quantite" min="1" value={formData.quantite} onChange={handleChange} required />

          <button type="submit" className="reserver-button">Attribuer</button>
        </form>

        {message && <p className="attribuer-message">{message}</p>}
      </div>
    </div>
  );
}

export default AttribuerEquipement;
