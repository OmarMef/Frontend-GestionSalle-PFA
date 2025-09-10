import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllHistorique } from "../Api/api";
import "./VoirReservation.css"; // tu peux reprendre le même CSS que VoirReservation.css

function VoirHistorique() {
  const [historiques, setHistoriques] = useState([]);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const data = await getAllHistorique(); // méthode API backend que tu as
        if (Array.isArray(data)) {
          setHistoriques(data);
        } else {
          setHistoriques([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique :", error);
      }
    };
    fetchHistorique();
  }, []);

  return (
    <div className="reservations-container">
      <div className="voirReservation-back-button">
        <Link to="/historique" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Liste des historiques</h1>
      <table>
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
              <td colSpan="6">Il faut être un ADMIN pour accéder à cette page</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoirHistorique;
