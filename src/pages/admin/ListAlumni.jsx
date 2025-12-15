import { useEffect, useState } from "react";
import "./All.css";


export default function AdminAlumniList() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/listAlumni")
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin-page">
      <h2>Data Alumni</h2>
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
                    <th>Aksi</th>
                </tr>
                </thead>

                <tbody>
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
                    <td>{item.tahun_masuk}</td>
                    <td>
                        <button className="btn btn-edit">Edit</button>
                        <button className="btn btn-delete">Hapus</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>  
    </div>
  );
}
