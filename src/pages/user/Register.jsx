import { useState } from "react";
import "./All.css";

export default function AlumniRegister() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");
  const [tahun_masuk, setTahunMasuk] = useState("");
  const [angkatan, setaAngkatan] = useState("");
  const [tahun_keluar, setTahunKeluar] = useState("");
  const [foto, setFoto] = useState(null);
  const [errorNim, setErrorNim] = useState("");

  // ========================
  // DAFTAR PRODI PER FAKULTAS
  // ========================
  const prodiList = {
    tarbiyah: [
      "Pendidikan Agama Islam",
      "Pendidikan Bahasa Arab",
      "Pendidikan Islam Anak Usia Dini",
      "Bimbingan Konseling Pendidikan Islam",
    ],
    syariah: [
      "Hukum Keluarga Islam",
      "Ekonomi Syariah",
      "Manajemen Haji & Umrah",
    ],
    dakwah: ["Komunikasi & Penyiaran Islam"],
    pascasarjana: [
      "Manajemen Pendidikan Islam",
      "Pendidikan Bahasa Arab",
    ],
  };

  // ========================
  // VALIDASI NIM
  // ========================
  const handleNimChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setErrorNim("NIM hanya boleh angka!");
      return;
    }

    setErrorNim("");
    setNim(value);
  };

  // ========================
  // SUBMIT DATA
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nama", nama);
    data.append("nim", nim);
    data.append("fakultas", fakultas);
    data.append("prodi", prodi);
    data.append("angkatan", angkatan);
    data.append("tahun_masuk", tahun_masuk);
    data.append("tahun_keluar", tahun_keluar);
    data.append("foto", foto);

    console.log("DATA YANG DIKIRIM:", Object.fromEntries(data));

    try {
      const res = await fetch("http://localhost:3000/inputAlumni", {
        method: "POST",
        body: data, // <-- FormData otomatis handle file + text
      });

      const result = await res.json();
      console.log("RESPON BACKEND:", result);
    } catch (error) {
      console.error("ERROR KIRIM DATA:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register Alumni</h2>

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
              type="number"
              placeholder="Masukkan NIM"
              value={nim}
              onChange={handleNimChange}
              required
            />
            {errorNim && <p className="error-text">{errorNim}</p>}
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

              {fakultas &&
                prodiList[fakultas].map((item, i) => (
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
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
