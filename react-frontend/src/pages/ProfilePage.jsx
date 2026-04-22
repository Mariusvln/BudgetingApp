import { useEffect, useState } from "react";
import DeleteAccountSection from "../components/profile-page-components/DeleteAccountSection";
import axios from "axios";
import TransactionNav from "../components/TransactionNav";
import ProfileAccountStatus from "../components/profile-page-components/ProfileAccountStatus";
import ProfileHeader from "../components/profile-page-components/ProfileHeader";
import ProfileNotifications from "../components/profile-page-components/ProfileNotifications";
import ProfilePersonalInformation from "../components/profile-page-components/ProfilePersonalInformation";
import ThemeSelector from "../components/profile-page-components/ThemeSelector";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const res = await axios.put(
        "http://localhost:8080/api/users/me",
        formData,
        { withCredentials: true },
      );

      setUser(res.data);
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      <div className="w-64">
        <TransactionNav />
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-500 mb-6">
          Manage your personal information and application preferences.
        </p>

        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfilePersonalInformation
            formData={formData}
            onChange={handleChange}
          />

          <div className="space-y-6">
            <ProfileNotifications />
            <ProfileAccountStatus />
            <DeleteAccountSection />
          </div>
        </div>

        <div className="flex gap-4 mt-2 items-center">
          <button
            onClick={logout}
            className="px-6 py-2 h-11 rounded-lg border border-base-300 bg-base-100"
          >
            Sign Out
          </button>

          <ThemeSelector />

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-green-500 text-white shadow disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
