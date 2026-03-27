import TransactionNav from "../components/TransactionNav";
import ProfileAccountStatus from "../components/profile-page-components/ProfileAccountStatus";
import ProfileHeader from "../components/profile-page-components/ProfileHeader";
import ProfileNotifications from "../components/profile-page-components/ProfileNotifications";
import ProfilePersonalInformation from "../components/profile-page-components/ProfilePersonalInformation";

const ProfilePage = () => {
  return (
    <>
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
            <button className="px-6 py-2 rounded-lg border border-gray-300 bg-white">
              Sign Out
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-600 text-white shadow">
              Save Changes
            </button>
          </div>

          {/* theme button */}
          <div className="dropdown mb-72">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="default"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Valentine"
                  value="valentine"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Aqua"
                  value="aqua"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="synthwave"
                  value="synthwave"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="coffee"
                  value="coffee"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="luxury"
                  value="luxury"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Mint Ice Cream"
                  value="mint-ice-cream"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
