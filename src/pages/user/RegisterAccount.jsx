import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "./All.css";

export default function RegisterAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const alumniData = JSON.parse(
    localStorage.getItem("register_alumni")
  );

  useEffect(() => {
    if (!alumniData?.id_alumni) {
      navigate("/register-alumni");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      await axios.post("https://154.19.37.160/register", {
        id_alumni: alumniData.id_alumni,
        username,
        password,
      });

      localStorage.removeItem("register_alumni");

      setSuccess("Registrasi akun berhasil");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registrasi gagal"
      );
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register Akun Alumni</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Daftar
          </button>

          <p className="register-link">
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
