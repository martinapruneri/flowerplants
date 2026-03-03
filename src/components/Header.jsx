import whitelogo from "../assets/whitelogo.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
        <div className="logo">
            <NavLink to="/">
                <img src={whitelogo} alt="FlowerPlant Logo" />
            </NavLink>
        </div>

        <nav className="nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/my-plants">My Plants</NavLink>
            <NavLink to="/about">About us</NavLink>
        </nav>
    </header>
  );
}