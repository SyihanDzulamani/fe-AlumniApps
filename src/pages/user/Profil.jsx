import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./All.css";

export default function ProfileAlumni() {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/listIdAlumni/${id}`);
        const data = await res.json();
        setAlumni(data);
      } catch (error) {
        console.error("Gagal ambil data profile alumni", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

  if (!alumni)
    return <p style={{ textAlign: "center" }}>Data alumni tidak ditemukan</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={alumni.foto_url}
          alt={alumni.nama}
          className="profile-photo"
        />

        <h2 className="profile-name">{alumni.nama}</h2>
        <p className="profile-nim">NIM: {alumni.nim}</p>

        <div className="profile-info">
          <div>
            <span>Fakultas</span>
            <p>{alumni.fakultas}</p>
          </div>
          <div>
            <span>Program Studi</span>
            <p>{alumni.prodi}</p>
          </div>
          <div>
            <span>Angkatan</span>
            <p>{alumni.angkatan}</p>
          </div>
          <div>
            <span>Tahun Masuk</span>
            <p>{alumni.tahun_masuk}</p>
          </div>
          <div>
            <span>Tahun Keluar</span>
            <p>{alumni.tahun_keluar}</p>
          </div>
        </div>

        <div className="profile-action">
          <Link to={`/update_alumni/${alumni.id_alumni}`}>
            <button className="btn btn-edit">Edit Data</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
