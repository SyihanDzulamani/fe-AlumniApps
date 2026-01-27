import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./All.css";

export default function RegisterAccount() {
  const [nim, setNim] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ================= VALIDASI FE =================
    if (!nim || !username || !password) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      // ================= 1. AMBIL DATA ALUMNI BERDASARKAN NIM =================
      const alumniRes = await axios.get(
        // `http://localhost:3000/listAlumni?nim=${nim}`
        `https://154.19.37.160/listAlumni?nim=${nim}`
      );

      const alumniList = alumniRes.data; // ARRAY langsung

      if (!Array.isArray(alumniList) || alumniList.length === 0) {
        setError("Data alumni tidak ditemukan");
        return;
      }

      const idAlumni = alumniList[0].id_alumni;

      // ================= 2. REGISTER AKUN =================
      // await axios.post("http://localhost:3000/register", {
      await axios.post("https://154.19.37.160/register", {
        id_alumni: idAlumni,
        username,
        password,
      });

      // ================= 3. SUCCESS =================
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
            <label>NIM</label>
            <input
              type="text"
              placeholder="Masukkan NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
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
