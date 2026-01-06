import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./All.css";
import { fakultasLabelMap, fakultasReverseMap,prodiList } from "../../utils/fakultas";

export default function UpdateAlumni() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");
  const [tahun_masuk, setTahunMasuk] = useState("");
  const [angkatan, setaAngkatan] = useState("");
  const [tahun_keluar, setTahunKeluar] = useState("");
  const [foto, setFoto] = useState(null);


  // ========================
  // AMBIL DATA DETAIL
  // ========================
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/listIdAlumni/${id}`
        );
        const data = await res.json();

        setNama(data.nama);
        setNim(data.nim);

        setFakultas(
          fakultasReverseMap[data.fakultas] || ""
        );

        setProdi(data.prodi);
        setaAngkatan(data.angkatan);
        setTahunMasuk(data.tahun_masuk);
        setTahunKeluar(data.tahun_keluar);
      } catch (err) {
        console.error("Gagal ambil detail alumni", err);
      }
    };

    fetchDetail();
  }, [id]);



  // ========================
  // UPDATE DATA
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nama", nama);

    // ⬇️ INI KUNCI UTAMANYA
    data.append(
      "fakultas",
      fakultasLabelMap[fakultas]
    );

    data.append("prodi", prodi);
    data.append("angkatan", angkatan);
    data.append("tahun_masuk", tahun_masuk);
    data.append("tahun_keluar", tahun_keluar);

    if (foto) data.append("foto", foto);

    try {
      const res = await fetch(
        `http://localhost:3000/editAlumni/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Update gagal");
        return;
      }

      alert("Data alumni berhasil diperbarui");
      navigate("/adm_list");
    } catch (err) {
      console.error("Gagal update alumni", err);
    }
  };



  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Update Data Alumni</h2>

        <form onSubmit={handleSubmit}>
          {/* NAMA */}
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          {/* NIM */}
          <div className="form-group">
            <label>NIM</label>
            <input
              type="text"
              value={nim}
              disabled
            />
            <small style={{ color: "#777" }}>
              NIM tidak dapat diubah
            </small>
          </div>

          {/* FAKULTAS */}
          <div className="form-group">
            <label>Program Fakultas</label>
            <select
              value={fakultas}
              onChange={(e) => {
                setFakultas(e.target.value);
                setProdi("");
              }}
              required
            >
              <option value="">Pilih Fakultas</option>
              <option value="tarbiyah">Fakultas Tarbiyah</option>
              <option value="syariah">Fakultas Syariah</option>
              <option value="dakwah">Fakultas Dakwah</option>
              <option value="pascasarjana">Pascasarjana</option>
            </select>
          </div>

          {/* PRODI */}
          <div className="form-group">
            <label>Program Studi</label>
            <select
              value={prodi}
              disabled={!fakultas}
              onChange={(e) => setProdi(e.target.value)}
              required
            >
              <option value="">Pilih Program Studi</option>

              {prodiList[fakultas]?.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>

            {!fakultas && (
              <small style={{ color: "red" }}>
                Pilih fakultas terlebih dahulu
              </small>
            )}
          </div>

          {/* angkatan */}
          <div className="form-group">
            <label>Angkatan</label>
            <input
              type="number"
              placeholder="Contoh: 1"
              value={angkatan}
              onChange={(e) => setaAngkatan(e.target.value)}
              required
            />
          </div>
          {/* TAHUN MASUK */}
          <div className="form-group">
            <label>Tahun Masuk</label>
            <input
              type="number"
              placeholder="Contoh: 2019"
              value={tahun_masuk}
              onChange={(e) => setTahunMasuk(e.target.value)}
              required
            />
          </div>

          {/* TAHUN KELUAR */}
          <div className="form-group">
            <label>Tahun Keluar</label>
            <input
              type="number"
              placeholder="Contoh: 2023"
              value={tahun_keluar}
              onChange={(e) => setTahunKeluar(e.target.value)}
              required
            />
          </div>

          {/* FOTO */}
          <div className="form-group">
            <label>Foto Resmi</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </div>

          <button type="submit" className="login-btn">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
