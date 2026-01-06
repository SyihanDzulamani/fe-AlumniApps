import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Prodi from "./pages/user/alumni/Prodi";
import Fakultas from "./pages/user/alumni/Fakultas";
import Home from "./pages/user/Home";
import Alumni from "./pages/user/alumni/Alumni";
import Footer from "./components/Footer";
import Angkatan from "./pages/user/alumni/Angkatan";
import Login from "./pages/user/Login";
import ProfileAlumni from "./pages/user/Profil";
import AlumniRegister from "./pages/user/Register";
import RegisterAccount from "./pages/user/RegisterAccount";
import "./App.css";

//Admin
import AdminAlumniList from "./pages/admin/ListAlumni";
import UpdateAlumni from "./pages/admin/Update";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/fakultas" element={<Fakultas />} />
        <Route path="/prodi" element={<Prodi />} />
        <Route path="/angkatan" element={<Angkatan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumniRegister" element={<AlumniRegister />} />
        <Route path="/profil/:id" element={<ProfileAlumni />} />
        <Route path="/registerAkun" element={<RegisterAccount />} />


        {/* admin */}
        <Route path="/adm_list" element={<AdminAlumniList />} />
        <Route path="/update_alumni/:id" element={<UpdateAlumni />} />


      </Routes>
      </div>

      <Footer />
    </Router>
  );
}
