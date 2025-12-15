import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AlumniChart() {
  // Contoh data — nanti backend bisa ganti
  const data = [
    { year: "2019", total: 120 },
    { year: "2020", total: 150 },
    { year: "2021", total: 180 },
    { year: "2022", total: 220 },
    { year: "2023", total: 260 },
  ];

  return (
    <div style={{ width: "100%", height: 300, background: "white", padding: "20px", borderRadius: "12px" }}>
      <h3 style={{ marginBottom: "15px", color: "#333" }}>Statistik Alumni per Tahun</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#33765A" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
