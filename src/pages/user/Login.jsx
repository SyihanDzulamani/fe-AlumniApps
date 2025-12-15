import "./All.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Masukkan username" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Masukkan password" required />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          
          <a href="/alumniRegister">belum punya akun?</a>
        </form>
      </div>
    </div>
  );
}
