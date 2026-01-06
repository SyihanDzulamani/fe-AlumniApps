import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./All.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (!res.data.success) {
        setError(res.data.message);
        return;
      }

      // simpan token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect berdasarkan role
      if (res.data.user.id_admin) {
        navigate("/adm_list");
      } else if (res.data.user.id_alumni) {
        navigate(`/profil/${res.data.user.id_alumni}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-link">
            Belum punya akun? <Link to="/alumniRegister">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
