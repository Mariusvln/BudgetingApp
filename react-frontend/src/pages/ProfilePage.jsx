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
import { useTheme } from "../contexts/useTheme";

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const { theme } = useTheme();

  const themeStyles = {
    light: {
      accentText: "text-indigo-600",
      saveButton: "bg-indigo-600 hover:bg-indigo-700",
    },
    dark: {
      accentText: "text-sky-300",
      saveButton: "bg-sky-500 hover:bg-sky-600",
    },
    valentine: {
      accentText: "text-pink-800",
      saveButton: "bg-pink-700 hover:bg-pink-800",
    },
    synthwave: {
      accentText: "text-fuchsia-300",
      saveButton: "bg-fuchsia-500 hover:bg-fuchsia-600",
    },
    luxury: {
      accentText: "text-amber-300",
      saveButton: "bg-amber-500 hover:bg-amber-600 text-black",
    },
    cyberpunk: {
      accentText: "text-pink-500",
      saveButton: "bg-yellow-300 hover:bg-yellow-400 text-black",
    },
    "light-green-pure": {
      accentText: "text-emerald-700",
      saveButton: "bg-emerald-500 hover:bg-emerald-600 text-emerald-950",
    },
  };

  const currentThemeStyles = themeStyles[theme] ?? themeStyles.light;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    currency: "EUR",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        currency: user.currency || "EUR",
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
        { withCredentials: true }
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
    return (
      <div className="min-h-screen bg-base-200 px-4 py-8 text-base-content">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="fixed left-0 top-0 hidden h-screen w-64 md:block">
        <TransactionNav variant="desktop" />
      </div>

      <main className="min-h-screen px-4 pt-5 pb-28 sm:px-6 md:px-8 lg:ml-64 lg:py-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-5 flex items-center justify-between gap-4 md:mb-8">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.18em] md:hidden ${currentThemeStyles.accentText}`}
              >
                FinVue
              </p>

              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                Profile
              </h1>

              <p className="mt-1 max-w-xl text-sm text-base-content/60 sm:text-base">
                Manage your personal information and application preferences.
              </p>
            </div>
          </div>

          <ProfileHeader user={user} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <ProfilePersonalInformation
              formData={formData}
              onChange={handleChange}
            />

            <div className="space-y-5 lg:space-y-6">
              <ProfileNotifications />
              <ProfileAccountStatus />
              <DeleteAccountSection />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center md:mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`h-11 rounded-xl px-5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 sm:hidden ${currentThemeStyles.saveButton}`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`hidden h-11 rounded-xl px-5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 sm:block ${currentThemeStyles.saveButton}`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <ThemeSelector />

            <button
              onClick={logout}
              className="h-11 rounded-xl border border-base-300 bg-base-100 px-5 text-sm font-semibold shadow-sm transition hover:bg-base-200"
            >
              Sign Out
            </button>
          </div>

          {message && (
            <p className="mt-4 rounded-xl bg-base-100 px-4 py-3 text-sm text-base-content/70 shadow-sm">
              {message}
            </p>
          )}
        </div>
      </main>

      <TransactionNav variant="mobile" />
    </div>
  );
};

export default ProfilePage;
