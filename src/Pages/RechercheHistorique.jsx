import React, { useState } from "react";
import { getHistoriqueByAction } from "../Api/api";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Reserver.css"; // style pour le formulaire
import "./VoirReservation.css"; // style pour le tableau

function HistoriqueParAction() {
  const [action, setAction] = useState(""); // valeur choisie dans le select
  const [historiques, setHistoriques] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAction(e.target.value);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!action) return setMessage("❌ Veuillez choisir une action !");
    try {
      const data = await getHistoriqueByAction(action);
      setHistoriques(Array.isArray(data) ? data : []);
      if (data.length === 0) setMessage("⚠️ Aucun historique trouvé pour cette action.");
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setMessage("❌ Impossible de récupérer les historiques.");
    }
  };

  return (
    <div className="reserver-container">
      {/* Bouton retour */}
      <div className=".reserver-back-button">
        <Link to="/historique" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      {/* Formulaire de recherche */}
      <div className="reserver-card">
        <h1 className="reserver-title">Filtrer l'historique par action</h1>
        <form className="reserver-form" onSubmit={handleSubmit}>
          <label>Action :</label>
          <select name="action" value={action} onChange={handleChange} className="reserver-input">
            <option value="">-- Choisir une action --</option>
            <option value="CREATION">CREATION</option>
            <option value="MODIFICATION">MODIFICATION</option>
            <option value="ANNULATION">ANNULATION</option>
          </select>

          <button type="submit" className="reserver-button">Rechercher</button>
        </form>
        {message && <p className="reserver-message">{message}</p>}
      </div>

      {/* Tableau des historiques */}
      {historiques.length > 0 && (
        <div className="reservations-container" style={{ marginTop: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Historique filtré :</h2>
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
              {historiques.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.utilisateur?.nom} {h.utilisateur?.prenom}</td>
                  <td>{h.reservation?.salle?.nom}</td>
                  <td>{h.dateAction}</td>
                  <td>{h.h_action}</td>
                  <td>{h.reservation?.id}</td>
                  <td>{h.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoriqueParAction;
