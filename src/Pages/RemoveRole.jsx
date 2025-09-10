import React, { useState, useEffect } from "react";
import { getAllUsers, removeRoleFromUser } from "../Api/api";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AddUser.css"; // réutilisation du CSS existant

function RemoveRole() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Récupérer tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Mettre à jour le rôle affiché quand l'utilisateur change
  const handleUserChange = (e) => {
    const username = e.target.value;
    setSelectedUser(username);

    const user = users.find((u) => u.username === username);
    setUserRole(user?.role?.nomRole || "");
  };

  // ✅ Supprimer le rôle
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !userRole) {
      setMessage("❌ Aucun rôle à supprimer pour cet utilisateur !");
      return;
    }

    try {
      await removeRoleFromUser(selectedUser, userRole);
      setMessage(`✅ Le rôle ${userRole} a été supprimé pour ${selectedUser}`);
      // Mettre à jour localement le rôle
      setUsers(
        users.map((u) =>
          u.username === selectedUser ? { ...u, role: null } : u
        )
      );
      setUserRole("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de la suppression du rôle");
    }
  };

  return (
    <div className="reserver-container">
      {/* Bouton retour */}
      <div className="back-button">
        <Link to="/user/role" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reserver-card">
        <h1 className="reserver-title">Retirer le rôle d'un utilisateur</h1>
        <form className="ajouter-form" onSubmit={handleSubmit}>
          <label>Utilisateur :</label>
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="ajouter-input"
          >
            <option value="">-- Sélectionnez un utilisateur --</option>
            {users.map((u) => (
              <option key={u.id} value={u.username}>
                {u.nom} {u.prenom} ({u.username})
              </option>
            ))}
          </select>

          <label>Rôle actuel :</label>
          <input
            type="text"
            value={userRole || "Aucun rôle"}
            readOnly
            className="ajouter-input"
          />

          <button type="submit" className="reserver-button">
            Supprimer le rôle
          </button>
        </form>

        {message && <p className="ajouter-message">{message}</p>}
      </div>
    </div>
  );
}

export default RemoveRole;
