import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="left">
          <strong>Alumni Apps</strong>
        </div>

        <div className="right">
          <nav className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>

        </div>
      </div>

      <div className="bottom">
        © ZuZu. All rights reserved.
      </div>
    </footer>
  );
}