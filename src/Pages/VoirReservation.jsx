import React, { useEffect, useState } from "react";
import { getReservations , deleteReservation} from "../Api/api";
import { FaEdit, FaTrash ,FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./VoirReservation.css";

function VoirReservations() {

  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        console.log("Données récupérées :", data);
        if (Array.isArray(data)) {
          setReservations(data);
        } else {
          setReservations([]); // fallback si ce n'est pas un tableau
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservations();
  }, []);

        const handleEdit = (id) => {
        console.log("Edit reservation id:", id);
        navigate(`/edit-reservation/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette réservation ?"
        );
        if (confirmDelete) {
        try {
            await deleteReservation(id);
            // Supprime la réservation du tableau local pour mise à jour instantanée
            setReservations(reservations.filter((res) => res.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
        }
    };

    return (
      <div className="reservations-container">

      
      <div className="voirReservation-back-button">
        <Link to="/reservation" className="back-button">
          <FaArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>

        <h1>Liste des réservations</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Salle</th>
              <th>Date</th>
              <th>Heure début</th>
              <th>Heure fin</th>
              <th>Type d'événement</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.id}</td>
                  <td>{res.utilisateur?.nom} {res.utilisateur?.prenom}</td>
                  <td>{res.salle?.nom}</td>
                  <td>{res.date_reservation}</td>
                  <td>{res.h_debut}</td>
                  <td>{res.h_fin}</td>
                  <td>{res.type_evenement}</td>
                  <td>{res.status}</td>
                  <td>
                    <FaEdit
                      className="icon edit"
                      onClick={() => handleEdit(res.id)}
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleDelete(res.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Il faut être un ADMIN pour accéder a cette page</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}


export default VoirReservations;



