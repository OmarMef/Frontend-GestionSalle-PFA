import React, { useEffect, useState } from "react";
import { getHistoriqueByUserId, getCurrentUserId } from "../Api/api";
import { FaArrowLeft} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MesReservations.css"; // tu peux copier le CSS de MesReservations.css et l’adapter

function MonHistorique() {
  const [historiques, setHistoriques] = useState([]);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const userId = await getCurrentUserId(); // récupère l'id de l'utilisateur connecté
        const data = await getHistoriqueByUserId(userId);
        setHistoriques(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
      }
    };

    fetchHistorique();
  }, []);

  return (
    <div className="mes-reservations-container">
      {/* Bouton retour */}
      <div className="reservervation-back-button">
        <Link to="/historique" className="back-link">
          <FaArrowLeft size={20} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Historique de mes Réservations</h1>
      <table className="historique-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Salle</th>
            <th>Date</th>
            <th>Heure</th>
            <th>ID Réservation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {historiques.length > 0 ? (
            historiques.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.utilisateur?.nom} {h.utilisateur?.prenom}</td>
                <td>{h.reservation?.salle?.nom}</td>
                <td>{h.dateAction}</td>
                <td>{h.h_action}</td>
                <td>{h.reservation?.id}</td>
                <td>{h.action}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucun historique trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MonHistorique;
