import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ButtonReuse from "./Button";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="logo-text">Universitas Islam KH. Ruhiat Cipasung</h2>
      </div>

      {/* BURGER BUTTON */}
      <div className="burger" onClick={() => setOpen(!open)}>
        <div className={open ? "line line1 active" : "line line1"}></div>
        <div className={open ? "line line2 active" : "line line2"}></div>
        <div className={open ? "line line3 active" : "line line3"}></div>
      </div>

      {/* MENU */}
      <div className={open ? "nav-links open" : "nav-links"}>
        <Link to="/" className="menu" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/angkatan" className="menu" onClick={() => setOpen(false)}>Alumni</Link>
        <ButtonReuse text="Login" to="/login" onClick={() => setOpen(false)}></ButtonReuse>
      </div>
    </nav>
  );
}
