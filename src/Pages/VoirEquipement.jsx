import React, { useEffect, useState } from "react";
import { getAllEquipements,deleteEquipement } from "../Api/api"; // ✅ à créer dans api.js
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate  } from "react-router-dom";
import "./VoirReservation.css"; // réutilisation du style tableau existant

function VoirEquipement() {
  const [equipements, setEquipements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const data = await getAllEquipements();
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

    // Gestion suppression (fonction simulée pour l'instant)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet équipement ?"
    );
    if (confirmDelete) {
      try {
        await deleteEquipement(id); // appeler ton API backend pour supprimer
        setEquipements(equipements.filter((e) => e.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

    // Gestion édition (redirection vers un formulaire d'édition)
 const handleEdit = (id) => {
    navigate(`/equipement/edit/${id}`); // à créer pour éditer l'équipement
  };

  return (
    <div className="reservations-container">
      {/* Bouton retour */}
      <div className="voirReservation-back-button">
        <Link to="/equipement" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Liste des équipements</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Description</th>
            <th>Action</th> 
            {/* tu peux ajouter d'autres colonnes si nécessaire */}
          </tr>
        </thead>
        <tbody>
          {equipements.length > 0 ? (
            equipements.map((equipement) => (
              <tr key={equipement.id}>
                <td>{equipement.id}</td>
                <td>{equipement.nom}</td>
                <td>{equipement.quantite}</td>
                <td>{equipement.description}</td>
                <td>
                  <FaEdit className="icon edit" onClick={() => handleEdit(equipement.id)} />
                  <FaTrash className="icon delete" onClick={() => handleDelete(equipement.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucun équipement disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoirEquipement;
