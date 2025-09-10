import React, { useEffect, useState } from "react";
import { getAllSalles, deleteSalle } from "../Api/api"; // ✅ à créer si non fait
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./VoirReservation.css"; // on réutilise le CSS existant

function VoirSalles() {
  const [salles, setSalles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const data = await getAllSalles();
        console.log("Salles récupérées :", data);
        if (Array.isArray(data)) {
          setSalles(data);
        } else {
          setSalles([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalles();
  }, []);

  const handleEdit = (id) => {
    navigate(`/salle/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette salle ?"
    );
    if (confirmDelete) {
      try {
        await deleteSalle(id); // ✅ à créer dans api.js
        setSalles(salles.filter((salle) => salle.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="reservations-container">
      {/* Bouton retour */}
      <div className="voirReservation-back-button">
        <Link to="/salle" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Liste des salles</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Capacité</th>
            <th>Localisation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salles.length > 0 ? (
            salles.map((salle) => (
              <tr key={salle.id}>
                <td>{salle.id}</td>
                <td>{salle.nom}</td>
                <td>{salle.capacite}</td>
                <td>{salle.localisation}</td>
                <td>
                  <FaEdit
                    className="icon edit"
                    onClick={() => handleEdit(salle.id)}
                  />
                  <FaTrash
                    className="icon delete"
                    onClick={() => handleDelete(salle.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucune salle disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoirSalles;
