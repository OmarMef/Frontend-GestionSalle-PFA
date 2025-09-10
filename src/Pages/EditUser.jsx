import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllUsers, editUser , getAllRoles } from "../Api/api"; // editUser à avoir dans api.js
import "./EditReservation.css"; // on réutilise le CSS existant

function EditUser() {
  const { id } = useParams(); // récupère l'id de l'utilisateur
  const navigate = useNavigate();
  

  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    username: "",
    password: "",
    roleId: "",
  });

  const [message, setMessage] = useState("");
   const [roles, setRoles] = useState([]);

  // Charger les infos de l'utilisateur depuis le backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers(); // récupère tous les utilisateurs
        const currentUser = users.find((u) => u.id === parseInt(id));
        if (currentUser) {
          setUser({
            nom: currentUser.nom,
            prenom: currentUser.prenom,
            username: currentUser.username,
            password: currentUser.password,
            roleId: currentUser.role?.id_role || "",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };
    fetchUser();
  }, [id]);

    // ✅ Charger les rôles depuis le backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getAllRoles(); // appel API pour récupérer les rôles
        setRoles(rolesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error);
      }
    };
    fetchRoles();
  }, []);

  // Gestion du formulaire
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Préparer le body à envoyer au backend
      const updatedUser = {
        nom: user.nom,
        prenom: user.prenom,
        username: user.username,
        password: user.password,
        role: { id_role: user.roleId }, // backend attend un objet role
      };
      await editUser(id, updatedUser);
      setMessage("✅ Utilisateur modifié avec succès !");
      setTimeout(() => navigate("/user/all"), 1500);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      setMessage("❌ Impossible de modifier l'utilisateur.");
    }
  };

  return (
    <div>
      {/* Bouton retour */}
      <div className="editReservation-back-button">
        <Link to="/user/all" className="back-link">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

      <div className="reservation-edit-container">
        <h1>Modifier l'utilisateur</h1>

        <form onSubmit={handleSubmit} className="reservation-edit-form">
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={handleChange}
          />

          <label>Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
          />

          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />

          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <label>Rôle :</label>
          <select name="roleId" value={user.roleId} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            {/* ✅ boucle dynamique sur les rôles récupérés */}
            {roles.map((role) => (
              <option key={role.id_role} value={role.id_role}>
                {role.nomRole}
              </option>
            ))}
          </select>

          <button type="submit">Mettre à jour</button>
        </form>

        {message && <p className="reservation-edit-message">{message}</p>}
      </div>
    </div>
  );
}

export default EditUser;
