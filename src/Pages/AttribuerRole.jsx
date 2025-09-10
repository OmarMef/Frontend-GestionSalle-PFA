import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getAllUsers, getAllRoles, addRoleToUser } from "../Api/api";
import "./AddUser.css"; // réutilisation du style existant

function AttribuerRole() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers(); // récupère tous les utilisateurs
        const rolesData = await getAllRoles(); // récupère tous les rôles
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Erreur récupération utilisateurs/roles :", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedRole) {
      setMessage("❌ Veuillez sélectionner un utilisateur et un rôle !");
      return;
    }

    try {
      console.log("Assignation rôle :", selectedUser, selectedRole);
      await addRoleToUser(selectedUser, selectedRole);
      setMessage(`✅ Le rôle ${selectedRole} a été attribué à ${selectedUser} avec succès !`);
    } catch (error) {
      console.error("Erreur attribution rôle :", error);
      setMessage("❌ Impossible d'attribuer le rôle.");
    }
  };

  return (
    <div className="reserver-container">
      <div className="back-button">
        <Link to="/user/role" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reserver-card">
        <h1 className="reserver-title">Attribuer un rôle à un utilisateur</h1>

        <form className="ajouter-form" onSubmit={handleSubmit}>
          <label>Utilisateur :</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="ajouter-input"
            required
          >
            <option value="">-- Sélectionnez un utilisateur --</option>
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.nom} {user.prenom} ({user.username})
              </option>
            ))}
          </select>

          <label>Rôle :</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="ajouter-input"
            required
          >
            <option value="">-- Sélectionnez un rôle --</option>
            {roles.map((role) => (
              <option key={role.id_role} value={role.nomRole}>
                {role.nomRole}
              </option>
            ))}
          </select>

          <button type="submit" className="reserver-button">
            Attribuer
          </button>
        </form>

        {message && <p className="ajouter-message">{message}</p>}
      </div>
    </div>
  );
}

export default AttribuerRole;
