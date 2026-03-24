import React from "react";
import TransactionNav from "../components/TransactionNav";
import ProfileAccountStatus from "../components/ProfileAccountStatus";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNotifications from "../components/ProfileNotifications";
import ProfilePersonalInformation from "../components/ProfilePersonalInformation";

const ProfilePage = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
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
            <button className="px-6 py-2 rounded-lg border border-gray-300 bg-white">
              Sign Out
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-600 text-white shadow">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
