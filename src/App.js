import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Fonctionnalite from "./Pages/Fonctionnalite";
import Reserver from "./Pages/Reserver";
import AddUser from "./Pages/AddUser";
import Reservation from "./Pages/Reservation";
import EditReservation from "./Pages/EditReservation"
import VoirReservation from "./Pages/VoirReservation";
import MesReservations from "./Pages/MesReservations";
import User from "./Pages/User"
import VoirUsers from "./Pages/VoirUsers";
import EditUser from "./Pages/EditUser";
import Role from "./Pages/Role"
import RoleList from "./Pages/RoleList";
import AddRole from "./Pages/AddRole"
import AttribuerRole from "./Pages/AttribuerRole";
import RemoveRole from "./Pages/RemoveRole";
import AccessDenied from "./Pages/AccessDenied";
import Salle from "./Pages/Salle"
import VoirSalles from "./Pages/VoirSalles"
import EditSalle from "./Pages/EditSalle";
import AddSalle from "./Pages/AddSalle";
import SalleDispo from "./Pages/SalleDispo.jsx";
import Equipement from "./Pages/Equipement.jsx";
import VoirEquipement from "./Pages/VoirEquipement.jsx";
import EditEquipement from "./Pages/EditEquipement.jsx";
import AddEquipement from "./Pages/AddEquipement.jsx";
import AttribuerEquipement from "./Pages/AttribuerEquipement.jsx";
import EquipementDispo from "./Pages/EquipementDispo.jsx";
import Historique from "./Pages/Historique.jsx";
import VoirHistorique from "./Pages/VoirHistorique.jsx";
import MonHistorique from "./Pages/MonHistorique.jsx";
import RechercheHistorique from "./Pages/RechercheHistorique.jsx"
import Dashboard from "./Pages/Dashboard.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/home" element={<Home />} />
        <Route path="/fonctionnalite" element={<Fonctionnalite />} />
        <Route path="/reserver" element={<Reserver />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/edit-reservation/:id" element={<EditReservation />} />
        <Route path="/list-reservations" element={<VoirReservation />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/user" element={<User />} />
        <Route path="user/AddUser" element={<AddUser />} />
        <Route path="/user/all" element={<VoirUsers />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
        <Route path="/user/role" element={<Role />} />
        <Route path="/role/all" element={<RoleList />} />
        <Route path="/role/add" element={<AddRole />} />
        <Route path="/role/to-user" element={<AttribuerRole />} />
        <Route path="/role/remove-user" element={<RemoveRole />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/salle" element={<Salle />} />
        <Route path="/salle/all" element={<VoirSalles />} />
        <Route path="/salle/edit/:id" element={<EditSalle />} />
        <Route path="/salle/addSalle" element={<AddSalle />} />
        <Route path="/salle/available" element={<SalleDispo />} />
        <Route path="/equipement" element={<Equipement />} />
        <Route path="/equipement/all" element={<VoirEquipement />} />
        <Route path="/equipement/edit/:id" element={<EditEquipement />} />
        <Route path="/equipement/add" element={<AddEquipement />} />
        <Route path="/equipement/to-salle" element={<AttribuerEquipement />} />
        <Route path="/equipement/available" element={<EquipementDispo />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/historique/all" element={<VoirHistorique />} />
        <Route path="/historique/user" element={<MonHistorique />} />
        <Route path="/historique/action" element={<RechercheHistorique />} />
        <Route path="/historique/graphe" element={<Dashboard />} />





      </Routes>
    </Router>
  );
}



