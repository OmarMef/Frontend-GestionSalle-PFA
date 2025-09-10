import React, { useEffect, useState } from "react";
import { getAllRoles, deleteRole } from "../Api/api";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./VoirReservation.css"; // Réutilisation du CSS existant

function VoirRoles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        console.log("Données rôles :", data);
        if (Array.isArray(data)) {
          setRoles(data);
        } else {
          setRoles([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error);
      }
    };
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce rôle ?"
    );
    if (confirmDelete) {
      try {
        await deleteRole(id); // API backend pour supprimer
        setRoles(roles.filter((role) => role.id_role !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="reservations-container">
      {/* Bouton retour */}
      <div className="voirReservation-back-button">
        <Link to="/user/role" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Liste des rôles</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du rôle</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id_role}>
                <td>{role.id_role}</td>
                <td>{role.nomRole}</td>
                <td>{role.description}</td>
                <td>
                  <FaTrash
                    className="icon delete"
                    onClick={() => handleDelete(role.id_role)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun rôle trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoirRoles;
