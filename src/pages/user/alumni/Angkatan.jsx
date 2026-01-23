import { Link } from "react-router-dom";
import "./All.css";

export default function Angkatan() {
  return (
    <>
    <h2>
      Angkatan Universitas Islam KH. Ruhiat Cipasung
    </h2>
    <Link to='/fakultas'>
        <button onClick={onclick} className="tombol" to="/alumni"> angkatan 1</button>
    </Link>
    </>
  );
}
