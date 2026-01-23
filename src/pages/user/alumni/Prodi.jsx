import { Link } from "react-router-dom";
import "./All.css";

export default function Prodi() {
  return (
    <>
    <h2>
      Program Studi Universitas Islam KH. Ruhiat Cipasung
    </h2>
    <Link to='/alumni'>
        <button onClick={onclick} className="tombol" to="/alumni">Informatika</button>
    </Link>
    </>
  );
}
