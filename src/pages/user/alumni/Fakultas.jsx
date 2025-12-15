import { Link } from "react-router-dom";
import "./All.css";

export default function Fakultas() {
  return (
    <>
    <h2>
      Fakultas Universitas Islam KH. Ruhiat Cipasung
    </h2>
    <Link to='/prodi'>
        <button onClick={onclick} to="/alumni"> Ilmu komputer </button>
    </Link>
    </>
  );
}
