import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardContainer from "../components/CardContainer"
import "./Fonctionnalite.css";

function Fonctionnalite() {
  return (
    <div>
      <Navbar/>
      <h1 style={{ textAlign: "center", marginTop: "30px" ,color: "#000000ff" , fontSize: "36px", fontWeight: "600"}}>
        Dashbord
      </h1>
      <CardContainer/>
      <Footer/>
    </div>
  );
}

export default Fonctionnalite;
