import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ButtonReuse from "./Button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [openDots, setOpenDots] = useState(false);
  

  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setOpenDots(false);
    window.dispatchEvent(new Event("auth-change"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="logo-text">Universitas Islam KH. Ruhiat Cipasung</h2>
      </div>

      {/* BURGER */}
      <div className="burger" onClick={() => setOpen(!open)}>
        <div className={open ? "line line1 active" : "line line1"}></div>
        <div className={open ? "line line2 active" : "line line2"}></div>
        <div className={open ? "line line3 active" : "line line3"}></div>
      </div>

      {/* MENU */}
      <div className={open ? "nav-links open" : "nav-links"}>
        <Link to="/" className="menu" onClick={() => setOpen(false)}>
          Home
        </Link>

        <Link to="/angkatan" className="menu" onClick={() => setOpen(false)}>
          Alumni
        </Link>

        {/* ================= BELUM LOGIN ================= */}
        {!user && (
          <ButtonReuse
            text="Login"
            to="/login"
            onClick={() => setOpen(false)}
          />
        )}

        {/* ================= ALUMNI ================= */}
        {user?.id_alumni && (
          <div className="profile-nav">
            <Link
              to={`/profil/${user.id_alumni}`}
              className="menu"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>

            {/* <button
              className="dots-btn"
              onClick={() => setOpenDots(!openDots)}
            >
              ⋮
            </button> */}
            <button
              className="logout-btn"
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
            >
              Logout
            </button>
            {user && openDots && (
              <div className="dropdown-nav">
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= ADMIN ================= */}
        {user?.id_admin && (
          <>
            <Link
              to="/adm_list"
              className="menu"
              onClick={() => setOpen(false)}
            >
              Kelola Alumni
            </Link>

            <button
              className="logout-btn"
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
