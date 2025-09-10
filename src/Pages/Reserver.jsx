import React, { useState, useEffect } from "react";
import { saveReservation, getCurrentUserId ,getAllSalles  } from "../Api/api";
import { Link } from "react-router-dom";   // pour navigation
import { FaArrowLeft } from "react-icons/fa"; // icône flèche retour
import "./Reserver.css";

function Reserver() {
  const [formData, setFormData] = useState({
    date_reservation: "",
    H_debut: "",
    H_fin: "",
    type_evenement: "",
    salleId: "",
    utilisateurId: "",
  });

  const [salles, setSalles] = useState([]); 
  const [message, setMessage] = useState("");


useEffect(() => {
  const fetchUserId = async () => {
    const id = await getCurrentUserId();
    if (id) {
      setFormData(prev => ({ ...prev, utilisateurId: id }));
    }
  };
  fetchUserId();
}, []);

  // ✅ Charger toutes les salles au montage
  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const sallesData = await getAllSalles(); // appel API backend
        setSalles(sallesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles :", error);
      }
    };
    fetchSalles();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // reset message à chaque changement
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifications simples avant envoi
    if (!formData.date_reservation) return setMessage("❌ Date manquante !");
    if (!formData.H_debut) return setMessage("❌ Heure de début manquante !");
    if (!formData.H_fin) return setMessage("❌ Heure de fin manquante !");
    if (!formData.type_evenement) return setMessage("❌ Type d'événement manquant !");
    if (!formData.salleId || formData.salleId <= 0) return setMessage("❌ ID de salle invalide !");
    if (!formData.utilisateurId || formData.utilisateurId <= 0) return setMessage("❌ ID utilisateur invalide !");

    // Vérifier que l'heure de début est avant l'heure de fin
  const startTime = new Date(`1970-01-01T${formData.H_debut}:00`);
  const endTime = new Date(`1970-01-01T${formData.H_fin}:00`);

  if (startTime >= endTime) {
    return setMessage("❌ L'heure de début doit être avant l'heure de fin !");
  }


       // Préparer le payload avec l'ID utilisateur connecté
    const payload = {
      date_reservation: formData.date_reservation,
      H_debut: formData.H_debut,
      H_fin: formData.H_fin,
      type_evenement: formData.type_evenement,
      salleId: formData.salleId,
      utilisateurId: formData.utilisateurId // envoyé automatiquement
    };

    // Si tout est correct, envoi au backend
    try {
      await saveReservation(payload);
      setMessage("✅ Réservation effectuée avec succès !");
      console.log("Réservation envoyée :", payload);

      // Reset formulaire
      setFormData({
        date_reservation: "",
        H_debut: "",
        H_fin: "",
        type_evenement: "",
        salleId: "",
        utilisateurId: formData.utilisateurId,
      });
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setMessage("❌ Erreur lors de la réservation");
    }
  };

  return (
    <div className="reserver-container">
      {/* ✅ Bouton retour vers /fonctionnalite */}
      <div className=".reserver-back-button">
        <Link to="/reservation" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>
    
      <div className="reserver-card">
        <h1 className="reserver-title">Réserver une salle</h1>
        <form className="reserver-form" onSubmit={handleSubmit}>
          <label>Date de réservation :</label>
          <input
            type="date"
            name="date_reservation"
            value={formData.date_reservation}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Heure de début :</label>
          <input
            type="time"
            name="H_debut"
            value={formData.H_debut}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Heure de fin :</label>
          <input
            type="time"
            name="H_fin"
            value={formData.H_fin}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Type d'événement :</label>
          <select
            name="type_evenement"
            value={formData.type_evenement}
            onChange={handleChange}
            className="reserver-input"
          >
            <option value="">-- Choisir --</option>
            <option value="REUNION">REUNION</option>
            <option value="COURS">COURS</option>
            <option value="CONFERENCE">CONFERENCE</option>
            <option value="FORMATION">FORMATION</option>
            <option value="EXAM">EXAM</option>
            <option value="AUTRE">AUTRE</option>
          </select>

              {/* ✅ Liste déroulante des salles */}
              <label>Choisir une salle :</label>
              <select
                name="salleId"
                value={formData.salleId}
                onChange={handleChange}
                className="reserver-input"
              >
                <option value="">-- Sélectionner une salle --</option>
                {salles.map((salle) => (
                  <option key={salle.id} value={salle.id}>
                    {salle.nom} (Capacité: {salle.capacite} - Localisation: {salle.localisation})
                  </option>
                ))}
              </select>

                <div>
            <label>Utilisateur (ID connecté) :</label>
            <input
                type="text"
                value={formData.utilisateurId || ""}
                placeholder="ID de l'utilisateur connecté"
                readOnly // empêche toute modification
                style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "4px",
                width: "100%",
                color: "#555",
                cursor: "not-allowed"
                }}
            />
            </div>

          <button type="submit" className="reserver-button">
            Réserver
          </button>
        </form>

        {message && <p className="reserver-message">{message}</p>}
      </div>
    </div>
  );
}

export default Reserver;

