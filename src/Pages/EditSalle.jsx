import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllSalles, editSalle } from "../Api/api"; // ✅ à créer dans api.js
import "./EditReservation.css"; // on réutilise le CSS existant

function EditSalle() {
  const { id } = useParams(); // récupère l'id de la salle
  const navigate = useNavigate();

  const [salle, setSalle] = useState({
    nom: "",
    capacite: "",
    localisation: "",
  });

  const [message, setMessage] = useState("");

  // Charger les infos de la salle depuis le backend
  useEffect(() => {
    const fetchSalle = async () => {
      try {
        const salles = await getAllSalles(); // récupère toutes les salles
        const currentSalle = salles.find((s) => s.id === parseInt(id));
        if (currentSalle) {
          setSalle({
            nom: currentSalle.nom,
            capacite: currentSalle.capacite,
            localisation: currentSalle.localisation,
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la salle :", error);
      }
    };
    fetchSalle();
  }, [id]);

  // Gestion du formulaire
  const handleChange = (e) => {
    setSalle({ ...salle, [e.target.name]: e.target.value });
    setMessage(""); // reset message à chaque changement
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSalle = {
        nom: salle.nom,
        capacite: salle.capacite,
        localisation: salle.localisation,
      };
      await editSalle(id, updatedSalle); // API pour modifier la salle
      setMessage("✅ Salle modifiée avec succès !");
      setTimeout(() => navigate("/salle/all"), 1500);
    } catch (error) {
      console.error("Erreur lors de la modification de la salle :", error);
      setMessage("❌ Impossible de modifier la salle.");
    }
  };

  return (
    <div>
      {/* Bouton retour */}
      <div className="editReservation-back-button">
        <Link to="/salle/all" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reservation-edit-container">
        <h1>Modifier la salle</h1>

        <form onSubmit={handleSubmit} className="reservation-edit-form">
          <label>Nom de la salle :</label>
          <input
            type="text"
            name="nom"
            value={salle.nom}
            onChange={handleChange}
          />

          <label>Capacité :</label>
          <input
            type="number"
            name="capacite"
            value={salle.capacite}
            onChange={handleChange}
            min="1"
          />

          <label>Localisation :</label>
          <input
            type="text"
            name="localisation"
            value={salle.localisation}
            onChange={handleChange}
          />

          <button type="submit">Mettre à jour</button>
        </form>

        {message && <p className="reservation-edit-message">{message}</p>}
      </div>
    </div>
  );
}

export default EditSalle;
