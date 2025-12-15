import { useEffect, useState } from "react";
import AlumniCard from "../../../components/AlumniCard";
import "./All.css";


export default function Alumni() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/listAlumni")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA ALUMNI:", data);
        setAlumni(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="alumni-container">
      {alumni.map((item) => (
        <AlumniCard key={item.id} data={item} />
      ))}
    </div>
  );
}
