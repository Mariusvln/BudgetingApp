import TransactionNav from "../components/TransactionNav";
import ProfileAccountStatus from "../components/profile-page-components/ProfileAccountStatus";
import ProfileHeader from "../components/profile-page-components/ProfileHeader";
import ProfileNotifications from "../components/profile-page-components/ProfileNotifications";
import ProfilePersonalInformation from "../components/profile-page-components/ProfilePersonalInformation";
import ThemeSelector from "../components/profile-page-components/ThemeSelector";
import ExportButton from "../components/profile-page-components/ExportButton";

const ProfilePage = () => {
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
        <div className="flex gap-4 mt-2">
          <button className="px-6 py-2 h-11 rounded-lg border border-base-300 bg-base-100">
            Sign Out
          </button>

          <ThemeSelector />

          <ExportButton />

          <button className="px-6 py-2 rounded-lg bg-green-500 text-white shadow">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
