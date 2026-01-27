import { useState } from "react";
import axios from "axios";

export default function ModalEditEmail({ user, onClose }) {
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        // `http://localhost:3000/updateEmail/${user.id_user}`,
        `https://154.19.37.160/updateEmail/${user.id_user}`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update localStorage
      const updatedUser = { ...user, username };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("auth-change"));

      alert("Email berhasil diperbarui");
      onClose();
    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Gagal update email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Edit Email / Username</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Batal
            </button>
            <button type="submit" disabled={loading}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
