import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function DeleteAccountSection() {
  const { setUser } = useAuth();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      setMessage("Please enter your password.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setMessage("");

      await axios.delete("http://localhost:8080/api/users/me", {
        data: { password },
        withCredentials: true,
      });

      setUser(null);
      window.location.href = "/signin";
    } catch (err) {
      console.error("Delete account error:", err);
      setMessage(err.response?.data?.message || "Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-red-200 bg-base-100 p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-bold text-red-600">Delete Account</h3>

      <p className="mt-2 text-sm text-gray-500">
        Enter your password to permanently delete your account.
      </p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Confirm your password"
        className="mt-4 h-12 w-full rounded-2xl border border-base-300 bg-base-200 px-4 text-sm outline-none transition focus:border-red-300 focus:bg-base-100"
      />

      <button
        onClick={handleDeleteAccount}
        disabled={deleting}
        className="mt-4 h-11 w-full rounded-2xl bg-red-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete Account"}
      </button>

      {message && <p className="mt-3 text-sm text-red-500">{message}</p>}
    </div>
  );
}

export default DeleteAccountSection;