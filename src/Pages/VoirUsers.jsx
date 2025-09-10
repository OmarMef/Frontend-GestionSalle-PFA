import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../Api/api";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./VoirReservation.css"; // Réutilisation du CSS existant

function VoirUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log("Données utilisateurs :", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/edit/${id}`); // à créer pour éditer l'utilisateur
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="reservations-container">
      {/* Bouton retour */}
      <div className="voirReservation-back-button">
        <Link to="/user" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <h1>Liste des utilisateurs</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
<tbody>
  {users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.nom}</td>
        <td>{user.prenom}</td>
        <td>{user.username}</td>
        <td>{user.password}</td>
        <td>{user.role?.nomRole}</td>  {/* <-- ici on affiche le nom du rôle */}
        <td>
          <FaEdit className="icon edit" onClick={() => handleEdit(user.id)} />
          <FaTrash className="icon delete" onClick={() => handleDelete(user.id)} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">Il faut être un ADMIN pour accéder a cette page</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}

export default VoirUsers;
