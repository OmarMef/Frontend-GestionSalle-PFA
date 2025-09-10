import React, { useEffect, useState } from "react";
import { getActionAnalytics, getTopUsers, getTopSalles } from "../Api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

function Dashboard() {
  const [actionsData, setActionsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [sallesData, setSallesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actions = await getActionAnalytics();
        setActionsData(Object.entries(actions).map(([name, value]) => ({ name, value })));

        const users = await getTopUsers();
        setUsersData(Object.entries(users).map(([name, value]) => ({ name, value })));

        const salles = await getTopSalles();
        setSallesData(Object.entries(salles).map(([name, value]) => ({ name, value })));
      } catch (err) {
        console.error("Erreur récupération dashboard:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#aff2abff", minHeight: "100vh" }}>
      <Navbar />

      {/* Bouton retour */}
    <div className="reservation-back-button">
      <Link to="/historique" className="back-link">
        <FaArrowLeft size={24} />
        <span>Retour</span>
      </Link>
    </div>


      <div style={{ padding: "30px 50px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "50px", color: "#333" }}>
          Dashboard Analytique
        </h1>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center"
        }}>
          {/* Graphique Actions */}
          <div style={{
            flex: "1 1 400px",
            background: "#fff",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Actions les plus fréquentes</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={actionsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {actionsData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique Utilisateurs */}
          <div style={{
            flex: "1 1 500px",
            background: "#fff",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Utilisateurs les plus actifs</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique Salles */}
          <div style={{
            flex: "1 1 500px",
            background: "#fff",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Salles les plus réservées</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sallesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
