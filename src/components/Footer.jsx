/*import React from "react";

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "#282c34", 
      color: "#fff", 
      textAlign: "center", 
      padding: "1rem" 
    }}>
      &copy; {new Date().getFullYear()} MonSite. Tous droits réservés.
    </footer>
  );
}

export default Footer;
*/

import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 EMSI - Projet Omar Meftah</p>
    </footer>
  );
}
