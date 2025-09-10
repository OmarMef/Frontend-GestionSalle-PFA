import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-wrapper">

      <Navbar />
      <HeroSection />
      <Footer />
      
    </div>
  );
}

export default Home;
