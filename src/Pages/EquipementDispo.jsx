import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getEquipementDispo } from "../Api/api"; // <-- utilisation de ta fonction existante
import "./VoirReservation.css";

function VoirEquipements() {
  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const data = await getEquipementDispo();
        if (Array.isArray(data)) {
          setEquipements(data);
        } else {
          setEquipements([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des équipements :", error);
      }
    };
    fetchEquipements();
  }, []);

  return (
    <div className="reservations-container">
      <div className="voirReservation-back-button">
        <Link to="/equipement" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Disponibilité des équipements</h1>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Est utilisé</th>
            <th>Quantité restante</th>
            <th>Salles et quantités</th>
          </tr>
        </thead>
        <tbody>
          {equipements.length > 0 ? (
            equipements.map((equipement, index) => (
              <tr key={index}>
                <td>{equipement.nom}</td>
                <td>{equipement.estUtilise ? "Oui" : "Non"}</td>
                <td>{equipement.quantiteRestante}</td>
                <td>
                  {equipement.salles.length > 0 ? (
                    <ul>
                      {equipement.salles.map((salle, idx) => (
                        <li key={idx}>
                          {salle.nomSalle} : {salle.quantite}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Aucune salle"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun équipement disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoirEquipements;
