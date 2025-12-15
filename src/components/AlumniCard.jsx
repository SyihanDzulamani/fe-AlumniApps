import "./AlumniCard.css";

export default function AlumniCard({ data }) {
  return (
    <div className="alumni-card">
      <img
        src={data.foto_url || "/default-avatar.png"} 
        alt={data.nama}
        className="alumni-photo"
      />

      <div className="alumni-info">
        <h3>{data.nama}</h3>
        <p>NIM : {data.nim}</p>
        <p>Fakultas : {data.fakultas}</p>
        <p>Prodi : {data.prodi}</p>
        <p>Angkatan : {data.angkatan}</p>
      </div>
    </div>
  );
}
