import "./Hero.css";
import heroImage from "../assets/hero.jpeg";
import ButtonReuse from "./Button";
// import AlumniChart from "./Chart/AlumniChart";

export default function Hero() {
  return (
    <div className="hero">
      <img src={heroImage} alt="Alumni" className="hero-bg" />

      <div className="hero-overlay"></div>

      <div className="hero-content">  
        <h1>Portal Alumni Universitas Islam KH.Ruhiat Cipasung</h1>
        <p>Menghubungkan alumni lintas generasi</p>
        <ButtonReuse text="Lihat Data Alumni" to="/alumni"/>
      </div>
      {/* <AlumniChart /> */}
    </div>
  );
}
