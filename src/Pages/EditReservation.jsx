import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getReservationById, updateReservation } from "../Api/api"; // à créer dans api.js
import "./EditReservation.css";

function EditReservation() {
  const { id } = useParams(); // récupère l'id de la réservation dans l'URL
  const navigate = useNavigate();

  const [reservation, setReservation] = useState({
    date_reservation: "",
    H_debut: "",
    H_fin: "",
    status: "",
    type_evenement: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Charger les infos de la réservation
  useEffect(() => {
    const fetchReservation = async () => {
      const data = await getReservationById(id);
      if (data) {
        setReservation({
          date_reservation: data.date_reservation,
          H_debut: data.H_debut,
          H_fin: data.H_fin,
          status: data.status,
          type_evenement: data.type_evenement,
        });
      }
    };
    fetchReservation();
  }, [id]);

  // ✅ Gestion du formulaire
  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateReservation(id, reservation);
      setMessage("✅ Réservation modifiée avec succès !");
      setTimeout(() => navigate("/list-reservations"), 1500); // revenir à la page /reservation
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setMessage("❌ Impossible de modifier la réservation.");
    }
  };

  return (
    <div>

      {/* Bouton retour */}
      <div className="editReservation-back-button">
        <Link to="/reservation" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reservation-edit-container">
        <h1>Modifier la Réservation</h1>

        <form onSubmit={handleSubmit} className="reservation-edit-form">
          <label>Date :</label>
          <input
            type="date"
            name="date_reservation"
            value={reservation.date_reservation}
            onChange={handleChange}
          />

          <label>Heure début :</label>
          <input
            type="time"
            name="H_debut"
            value={reservation.H_debut}
            onChange={handleChange}
          />

          <label>Heure fin :</label>
          <input
            type="time"
            name="H_fin"
            value={reservation.H_fin}
            onChange={handleChange}
          />

          <label>Status :</label>
          <select
            name="status"
            value={reservation.status}
            onChange={handleChange}
          >
            <option value="">-- Choisir --</option>
            <option value="EN_ATTENTE">EN_ATTENTE</option>
            <option value="VALIDEE">VALIDEE</option>
            <option value="REFUSEE">REFUSEE</option>
            <option value="ANNULEE">ANNULEE</option>
          </select>

          <label>Type d'événement :</label>
          <select
            name="type_evenement"
            value={reservation.type_evenement}
            onChange={handleChange}
          >
            <option value="">-- Choisir --</option>
            <option value="REUNION">REUNION</option>
            <option value="COURS">COURS</option>
            <option value="CONFERENCE">CONFERENCE</option>
            <option value="FORMATION">FORMATION</option>
            <option value="EXAM">EXAM</option>
            <option value="AUTRE">AUTRE</option>
          </select>

          <button type="submit">Mettre à jour</button>
        </form>

        {message && <p className="reservation-edit-message">{message}</p>}
      </div>

    </div>
  );
}

export default EditReservation;
