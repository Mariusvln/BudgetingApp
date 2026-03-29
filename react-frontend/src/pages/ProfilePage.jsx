import TransactionNav from "../components/TransactionNav";
import ProfileAccountStatus from "../components/profile-page-components/ProfileAccountStatus";
import ProfileHeader from "../components/profile-page-components/ProfileHeader";
import ProfileNotifications from "../components/profile-page-components/ProfileNotifications";
import ProfilePersonalInformation from "../components/profile-page-components/ProfilePersonalInformation";
import { useTheme } from "../contexts/useTheme";

const ProfilePage = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    "light",
    "retro",
    "cyberpunk",
    "valentine",
    "aqua",
    "synthwave",
    "coffee",
    "luxury",
    "mint-ice-cream",
  ];

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64">
        <TransactionNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-500 mb-6">
          Manage your personal information and application preferences.
        </p>

        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfilePersonalInformation />

          <div className="space-y-6">
            <ProfileNotifications />
            <ProfileAccountStatus />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 rounded-lg border border-base-300 bg-base-100">
            Sign Out
          </button>
          <button className="px-6 py-2 rounded-lg bg-primary text-primary-content shadow">
            Save Changes
          </button>
        </div>

        {/* Theme selector */}
        <div className="dropdown mt-10">
          <div tabIndex={0} role="button" className="btn">
            Theme: {theme}
            <svg
              width="12px"
              height="12px"
              className="inline-block ml-2 h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-72 overflow-y-auto"
          >
            {themes.map((t) => (
              <li key={t}>
                <button
                  onClick={() => setTheme(t)}
                  className={`btn btn-sm btn-block justify-start ${
                    theme === t ? "btn-active" : "btn-ghost"
                  }`}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;