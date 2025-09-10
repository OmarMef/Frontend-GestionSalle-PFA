import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082",
  withCredentials: true
});
 
//Save Reservation
export const saveReservation = async (reservation) => {
  const params = new URLSearchParams();
  params.append("date_reservation", reservation.date_reservation);
  params.append("H_debut", reservation.H_debut);
  params.append("H_fin", reservation.H_fin);
  params.append("type_evenement", reservation.type_evenement);
  params.append("salleId", reservation.salleId);
  params.append("utilisateurId", reservation.utilisateurId);

  const response = await api.post("/reserv/save", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data;
};

export const getReservations = async () => {
  const response = await api.get("/reserv/all"); // endpoint à créer côté backend
  return response.data;
};

// Récupérer une réservation par ID
export const getReservationById = async (id) => {
  try {
    const response = await api.get(`/reserv/${id}`);
    return response.data;
  } catch (error) {
    console.error("Impossible de récupérer la réservation :", error);
    return null;
  }
};

// Mettre à jour une réservation
export const updateReservation = async (id, reservation) => {
  const params = new URLSearchParams();
  params.append("newDate", reservation.date_reservation);
  params.append("newH_debut", reservation.H_debut);
  params.append("newH_fin", reservation.H_fin);
  params.append("newStatus", reservation.status);
  params.append("newtypeEvenement", reservation.type_evenement);

  const response = await api.put(`/reserv/edit/${id}`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

// Supprimer une réservation par ID
export const deleteReservation = async (id) => {
  try {
    const response = await api.delete(`/reserv/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Impossible de supprimer la réservation :", error);
    return null;
  }
};

// api.js
export const getReservationsByUserId = async (userId) => {
  const response = await api.get(`/reserv/user/id/${userId}`);
  return response.data;
};


//**********************************************************************************/
export const getCurrentUser = async () => {
  try {
    const response = await api.get("user/me");
    return response.data; // {nom, username}
  } catch (error) {
    console.error("Impossible de récupérer l'utilisateur connecté.", error);
    return null;
  }
};

export const getCurrentUserId = async () => {
  try {
    const response = await api.get("/user/me/id");
    return response.data; // c'est l'ID directement
  } catch (error) {
    console.error("Impossible de récupérer l'ID de l'utilisateur connecté", error);
    return null;
  }
};

// Récupérer le rôle de l'utilisateur connecté
export const getCurrentUserRole = async () => {
  try {
    const response = await api.get("/user/current-role");
    return response.data.role; // renvoie "ADMIN", "USER" ou "RESPONSABLE"
  } catch (error) {
    console.error("Impossible de récupérer le rôle de l'utilisateur :", error);
    return null; // fallback si erreur
  }
};

// Fonction pour ajouter un utilisateur
export const addUser = async (formData) => {
  return await api.post("/user/save", null, { params: formData });
};

// Récupérer tous les utilisateurs (admin)
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/admin/users");
    return response.data; // renvoie la liste des utilisateurs
  } catch (error) {
    console.error("Impossible de récupérer les utilisateurs :", error);
    return [];
  }
};

// Supprimer un utilisateur par ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/delete/${id}`);
    return response.data; // peut être null ou message de confirmation
  } catch (error) {
    console.error("Impossible de supprimer l'utilisateur :", error);
    return null;
  }
};

// Mettre à jour un utilisateur
export const editUser = async (id, userData) => {
  try {
    // userData = { nom, username, email, role, ... }
    const response = await api.put(`/user/edit/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // retourne l'utilisateur mis à jour
  } catch (error) {
    console.error("Impossible de mettre à jour l'utilisateur :", error);
    return null;
  }
};

//***************************************************************************

// Récupérer tous les rôles
export const getAllRoles = async () => {
  try {
    const response = await api.get("/roles/all"); // Endpoint backend pour récupérer les rôles
    return response.data;
  } catch (error) {
    console.error("Impossible de récupérer les rôles :", error);
    return [];
  }
};


export const addRoleToUser = async (username, role) => {
  try {
    const response = await api.post("/user/addRole", null, {
      params: { username, role },
    });
    return response.data;
  } catch (error) {
    console.error("Impossible d'ajouter le rôle :", error);
    return null;
  }
};

// Supprimer le rôle d'un utilisateur
export const removeRoleFromUser = async (username, role) => {
  try {
    const response = await api.post("/user/removeRole", null, {
      params: { username, role },
    });
    return response.data;
  } catch (error) {
    console.error("Impossible de supprimer le rôle :", error);
    return null;
  }
};


// ➕ Ajouter un rôle
export const addRole = async (role) => {
  const params = new URLSearchParams();
  params.append("nomRole", role.nomRole);
  params.append("desc", role.desc);

  return await api.post("/roles/save", params);
};


export const deleteRole = async (id) => {
  try {
    await api.delete(`/roles/delete/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du rôle :", error);
    throw error;
  }
};

//**********************************************************************************

// ✅ Récupérer toutes les salles
export const getAllSalles = async () => {
  try {
    const response = await api.get("/salle/all"); // adapte l'URL à ton backend
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des salles :", error);
    return [];
  }
};

// Supprimer une salle
export const deleteSalle = async (id) => {
  try {
    await api.delete(`/salles/${id}`); // adapte l'URL backend
  } catch (error) {
    console.error("Erreur lors de la suppression de la salle :", error);
  }
};

// Modifier une salle
export const editSalle = async (id, updatedSalle) => {
  try {
    await api.put(`/salles/${id}`, updatedSalle); // adapte l’URL backend
  } catch (error) {
    console.error("Erreur lors de la modification de la salle :", error);
  }
};

// Ajouter une nouvelle salle
export const addSalle = async (newSalle) => {
  try {
    await api.post("/salle/save", newSalle); // adapte l’URL backend
  } catch (error) {
    console.error("Erreur lors de l'ajout de la salle :", error);
  }
};

// Récupérer les salles disponibles
export const getAvailableSalles = async ({ date, heureDebut, heureFin, capaciteMin }) => {
  const response = await api.get("/salle/available", {
    params: { date, heureDebut, heureFin, capaciteMin },
  });
  return response.data;
};

//*********************************************************************************************

// Récupérer tous les équipements
export const getAllEquipements = async () => {
  try {
    const response = await api.get("/equip/all"); // utilise Axios
    return response.data; // les données sont dans response.data
  } catch (error) {
    console.error("Erreur API getAllEquipements:", error);
    return [];
  }
};

// Récupérer un équipement par ID
export const getEquipementById = async (id) => {
  try {
    const response = await api.get(`/equip/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur API getEquipementById :", error);
    return null;
  }
};

// Ajouter un nouvel équipement
export const addEquipement = async ({ nom, description, quantite }) => {
  try {
    const response = await api.post(
      "/equip/save",
      null, // Pas de body, car les données sont envoyées en params
      {
        params: { nom, description, quantite },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur API addEquipement :", error);
    throw error;
  }
};

// Supprimer un équipement
export const deleteEquipement = async (id) => {
  try {
    await api.delete(`/equip/delete/${id}`);
  } catch (error) {
    console.error("Erreur API deleteEquipement :", error);
    throw error;
  }
};

// Éditer / mettre à jour un équipement
export const editEquipement = async (id, nom, description, quantite) => {
  try {
    const response = await api.put(
      `/equip/edit/id/${id}`,
      null, // Pas de body, car les données sont envoyées en params
      {
        params: { nom, description, quantite },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur API editEquipement :", error);
    throw error;
  }
};

//Attribuer equipement a une salle 
export const attribuerEquipement = async ({ equipementId, salleId, quantite }) => {
  const response = await api.post("/Salle-Equipement/add", null, {
    params: { equipementId, salleId, quantite },
  });
  return response.data;
};


//Disponibilite equipement
export const getEquipementDispo = async () => {
  try {
    const response = await api.get("/equip/disponible"); // <-- utilise api avec baseURL
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des équipements :", error);
    throw error;
  }
};

//********************************************************************************

// Récupérer tous les historiques
export const getAllHistorique = async () => {
  try {
    const response = await api.get("/hist/all");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    return [];
  }
};

//Historique d utilisateur connecte 
export const getHistoriqueByUserId = async (id) => {
  try {
    const response = await api.get(`/hist/user/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique de l'utilisateur :", error);
    return [];
  }
};

// Récupérer l'historique par action (status)
export const getHistoriqueByAction = async (action) => {
  try {
    const response = await api.get(`/hist/action`, {
      params: { action }  // envoie l'action choisie comme paramètre
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique par action :", error);
    throw error;
  }
};

//Dashbord analytics actions
export const getActionAnalytics = async () => {
  const response = await api.get("/hist/analytics/actions");
  return response.data;
};

//Dashbord analytics users
export const getTopUsers = async () => {
  const response = await api.get("/hist/analytics/users");
  return response.data;
};

//Dashbord analytics salles
export const getTopSalles = async () => {
  const response = await api.get("/hist/analytics/salles");
  return response.data;
};

