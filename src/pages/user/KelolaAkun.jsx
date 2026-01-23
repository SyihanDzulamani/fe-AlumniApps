import { useState } from "react";
import ModalEditEmail from "./ModalEditEmail";
import ModalChangePassword from "./ModalChangePassword";

export default function KelolaAkun() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  return (
    <div className="account-container">
      <h2>Kelola Akun</h2>

      {/* EMAIL / USERNAME */}
      <div className="account-row">
        <div>
          <strong>Email / Username</strong>
          <p>{user.username}</p>
        </div>
        <button onClick={() => setOpenEmail(true)}>Edit</button>
      </div>

      {/* PASSWORD */}
      <div className="account-row">
        <div>
          <strong>Password</strong>
          <p>********</p>
        </div>
        <button onClick={() => setOpenPassword(true)}>
          Ubah Password
        </button>
      </div>

      {/* MODAL */}
      {openEmail && (
        <ModalEditEmail
          user={user}
          onClose={() => setOpenEmail(false)}
        />
      )}

      {openPassword && (
        <ModalChangePassword
          onClose={() => setOpenPassword(false)}
        />
      )}
    </div>
  );
}
