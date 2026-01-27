import { useEffect, useState, useCallback } from "react";
import "./All.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminAlumniList() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);

  // ambil data alumni
  const getAlumni = useCallback(async () => {
    setLoading(true);
    try {
      // const res = await axios.get("http://localhost:3000/listAlumni");
      const res = await axios.get("https://154.19.37.160/listAlumni");
      setAlumni(res.data);
    } catch (error) {
      console.error("Gagal fetch alumni:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // hapus data alumni
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus data alumni ini?");
    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(`
        https://154.19.37.160/deleteAlumni/${id}`,
        // http://localhost:3000/deleteAlumni/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data alumni berhasil dihapus");
      getAlumni(); // refresh data
    } catch (error) {
      console.error("Gagal delete:", error.response || error);
      alert("Gagal menghapus data alumni");
    }
  };

  // first load
  useEffect(() => {
    getAlumni();
  }, [getAlumni]);

  return (
    <div className="admin-page">
      <h2>Data Alumni</h2>

      {loading && <p>Loading data...</p>}

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>NIM</th>
              <th>Nama</th>
              <th>Fakultas</th>
              <th>Prodi</th>
              <th>Angkatan</th>
              <th>Tahun Masuk</th>
              <th>Tahun keluar</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {alumni.length === 0 && !loading && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Data alumni kosong
                </td>
              </tr>
            )}

            {alumni.map((item) => (
              <tr key={item.id_alumni}>
                <td>
                  <img
                    src={item.foto_url}
                    alt={item.nama}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>
                <td>{item.nim}</td>
                <td>{item.nama}</td>
                <td>{item.fakultas}</td>
                <td>{item.prodi}</td>
                <td>{item.angkatan}</td>
                <td>{item.tahun_masuk}</td>
                <td>{item.tahun_keluar}</td>
                <td>
                  <Link to={`/update_alumni/${item.id_alumni}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id_alumni)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}