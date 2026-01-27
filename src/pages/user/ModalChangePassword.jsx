import { useState } from "react";
import axios from "axios";

export default function ModalChangePassword({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      alert("Password baru tidak cocok");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        // "http://localhost:3000/changePassword",
        "https://154.19.37.160/changePassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password berhasil diubah. Silakan login ulang.");
      localStorage.clear();
      window.dispatchEvent(new Event("auth-change"));
      onClose();
    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Gagal mengganti password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Ubah Password</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Konfirmasi password baru"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
