import React, { useState } from "react";
import { getAvailableSalles } from "../Api/api";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Reserver.css"; // pour le style du formulaire
import "./VoirReservation.css"; // pour le style du tableau

function SalleDispo() {
  const [searchData, setSearchData] = useState({
    date: "",
    heureDebut: "",
    heureFin: "",
    capaciteMin: "",
  });

  const [salles, setSalles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchData.date) return setMessage("❌ Date manquante !");
    if (!searchData.heureDebut) return setMessage("❌ Heure de début manquante !");
    if (!searchData.heureFin) return setMessage("❌ Heure de fin manquante !");
    if (!searchData.capaciteMin || searchData.capaciteMin <= 0)
      return setMessage("❌ Capacité minimale invalide !");

    try {
      const response = await getAvailableSalles(searchData);
      setSalles(response);
      if (response.length === 0) setMessage("⚠️ Aucune salle disponible.");
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setMessage("❌ Impossible de récupérer les salles.");
    }
  };

  return (
    <div className="reserver-container">
      {/* Bouton retour */}
      <div className=".reserver-back-button">
        <Link to="/salle" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reserver-card">
        <h1 className="reserver-title">Rechercher salles disponibles</h1>
        <form className="reserver-form" onSubmit={handleSubmit}>
          <label>Date :</label>
          <input
            type="date"
            name="date"
            value={searchData.date}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Heure de début :</label>
          <input
            type="time"
            name="heureDebut"
            value={searchData.heureDebut}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Heure de fin :</label>
          <input
            type="time"
            name="heureFin"
            value={searchData.heureFin}
            onChange={handleChange}
            className="reserver-input"
          />

          <label>Capacité minimale :</label>
          <input
            type="number"
            name="capaciteMin"
            value={searchData.capaciteMin}
            onChange={handleChange}
            min="1"
            className="reserver-input"
          />

          <button type="submit" className="reserver-button">
            Rechercher
          </button>
        </form>

        {message && <p className="reserver-message">{message}</p>}
      </div>

      {/* Tableau des salles disponible avec style VoirUsers */}
      {salles.length > 0 && (
        <div className="reservations-container" style={{ marginTop: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Salles disponibles :</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Capacité</th>
                <th>Localisation</th>
              </tr>
            </thead>
            <tbody>
              {salles.map((salle) => (
                <tr key={salle.id}>
                  <td>{salle.id}</td>
                  <td>{salle.nom}</td>
                  <td>{salle.capacite}</td>
                  <td>{salle.localisation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalleDispo;
