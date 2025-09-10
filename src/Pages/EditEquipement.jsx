import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getEquipementById, editEquipement } from "../Api/api"; // à créer dans api.js
import "./EditReservation.css"; // on peut réutiliser le CSS existant

function EditEquipement() {
  const { id } = useParams(); // récupère l'id de l'équipement
  const navigate = useNavigate();

  const [equipement, setEquipement] = useState({
    nom: "",
    description: "",
    quantite: 0,
  });

  const [message, setMessage] = useState("");

  // Charger les infos de l'équipement
  useEffect(() => {
    const fetchEquipement = async () => {
      const data = await getEquipementById(id);
      if (data) {
        setEquipement({
          nom: data.nom,
          description: data.description,
          quantite: data.quantite,
        });
      }
    };
    fetchEquipement();
  }, [id]);

  // Gestion du formulaire
  const handleChange = (e) => {
    setEquipement({ ...equipement, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editEquipement(id, equipement.nom, equipement.description, parseInt(equipement.quantite));
      setMessage("✅ Équipement modifié avec succès !");
      setTimeout(() => navigate("/equipement/all"), 1500); // revenir à la page liste équipements
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setMessage("❌ Impossible de modifier l'équipement.");
    }
  };

  return (
    <div>

      {/* Bouton retour */}
      <div className=".reserver-back-button">
        <Link to="/equipement/all" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reservation-edit-container">
        <h1>Modifier l'Équipement</h1>

        <form onSubmit={handleSubmit} className="reservation-edit-form">
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={equipement.nom}
            onChange={handleChange}
          />

          <label>Description :</label>
          <input
            type="text"
            name="description"
            value={equipement.description}
            onChange={handleChange}
          />

          <label>Quantité :</label>
          <input
            type="number"
            name="quantite"
            value={equipement.quantite}
            onChange={handleChange}
          />

          <button type="submit">Mettre à jour</button>
        </form>

        {message && <p className="reservation-edit-message">{message}</p>}
      </div>

    </div>
  );
}

export default EditEquipement;
