import whitelogo from "../assets/whitelogo.png";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* LEFT – Quick Links */}
        <div className="footer-column footer-links">
          <h4>Quick Links</h4>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/my-plants">My Plants</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>

        {/* CENTER – Contact Info */}
        <div className="footer-column footer-contact">
          <h4>Contact</h4>
          <p>123 Botanical Lane</p>
          <p>Green City, 2345 Copenhagen</p>
          <p>Email: flowplant123@flowerplants.dk</p>
          <p>Mobile: +45 2076765</p>
        </div>

        {/* RIGHT – Logo */}
        <div className="footer-column footer-right">
          <img src={whitelogo} alt="Flower Plants logo" />
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Flower Plants. All rights reserved.</p>
      </div>
    </footer>
  );
}