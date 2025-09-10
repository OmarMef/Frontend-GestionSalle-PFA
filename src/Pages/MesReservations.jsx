import React, { useEffect, useState } from "react";
import { getReservationsByUserId, getCurrentUserId } from "../Api/api";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MesReservations.css";

function MesReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = await getCurrentUserId(); // récupère l'id de l'utilisateur connecté
        const data = await getReservationsByUserId(userId);
        setReservations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="mes-reservations-container">
      {/* Bouton retour */}
      <div className="reservervation-back-button">
        <Link to="/reservation" className="back-link">
          <FaArrowLeft size={20} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Mes réservations</h1>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Salle</th>
            <th>Date</th>
            <th>Heure début</th>
            <th>Heure fin</th>
            <th>Type d'événement</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                 <td>{res.utilisateur?.nom} {res.utilisateur?.prenom}</td>
                <td>{res.salle?.nom}</td>
                <td>{res.date_reservation}</td>
                <td>{res.h_debut}</td>
                <td>{res.h_fin}</td>
                <td>{res.type_evenement}</td>
                <td>{res.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Aucune réservation trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MesReservations;
