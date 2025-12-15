import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const ButtonReuse = ({ 
  text, 
  to, 
  onClick, 
  disabled = false,
  className = "button-login" // default bisa kamu ganti
}) => {

  // Kalau ada "to", jadikan Link
  if (to) {
    return (
      <Link to={to} onClick={onClick}>
        <button className={className} disabled={disabled}>
          {text}
        </button>
      </Link>
    );
  }

  // Kalau tidak ada "to", tombol biasa
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonReuse;

