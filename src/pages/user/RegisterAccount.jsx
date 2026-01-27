import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./All.css";

export default function RegisterAccount() {
  const [idAlumni, setIdAlumni] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ===== VALIDASI FE =====
    if (!idAlumni || !username || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      await axios.post("https://154.19.37.160/register", {
        id_alumni: Number(idAlumni),
        username,
        password,
      });

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
            <label>ID Alumni</label>
            <input
              type="number"
              placeholder="Masukkan ID Alumni"
              value={idAlumni}
              onChange={(e) => setIdAlumni(e.target.value)}
              required
            />
          </div>

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
