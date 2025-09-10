import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { FaLock} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCurrentUser } from "../Api/api";
import "./AccessDenied.css";

function AccessDenied() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="access-denied-page">
      <Navbar />

      <div className="access-denied-container">
        <div className="access-denied-icon">
          <FaLock size={80} color="#f44336" />
        </div>

        <h1>Accès refusé</h1>

        {loading ? (
          <p>Chargement des informations utilisateur...</p>
        ) : (
          <p>
            {user
              ? `Désolé ${user.nom || user.username}, vous n'avez pas la permission d'accéder à cette section.`
              : "Vous devez être connecté en tant qu'admin pour accéder à cette section."}
          </p>
        )}

        <div className="access-denied-buttons">
          <button
            className="access-denied-button"
            onClick={() => navigate("/fonctionnalite")}
          >
            Retour à votre tableau de bord
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AccessDenied;
