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
      setMessage(
        err.response?.data?.message || "Failed to delete account."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-8 bg-base-100 rounded-2xl shadow p-6 border border-red-200">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Delete Account</h3>
      <p className="text-sm text-gray-500 mb-4">
        Enter your password to permanently delete your account.
      </p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Confirm your password"
        className="w-full rounded-lg border-gray-200 bg-base-200 p-3 mb-4"
      />

      <button
        onClick={handleDeleteAccount}
        disabled={deleting}
        className="px-6 py-2 rounded-lg bg-red-500 text-white shadow disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete Account"}
      </button>

      {message && (
        <p className="mt-3 text-sm text-red-500">{message}</p>
      )}
    </div>
  );
}

export default DeleteAccountSection;