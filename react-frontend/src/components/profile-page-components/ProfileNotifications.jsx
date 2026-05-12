import { useTheme } from "../../contexts/useTheme";

function ProfileNotifications() {
  const { theme } = useTheme();

  const isValentineTheme = theme === "valentine";

  const toggleClass = isValentineTheme ? "toggle-secondary" : "toggle-success";

  return (
    <div className="rounded-3xl bg-base-100 p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-lg font-bold">Notifications</h3>

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-semibold">Push Notifications</p>
          <p className="mt-1 text-sm text-base-content/60">
            Alerts for transactions and insights
          </p>
        </div>

        <input
          type="checkbox"
          className={`toggle shrink-0 ${toggleClass}`}
          defaultChecked
        />
      </div>
    </div>
  );
}

export default ProfileNotifications;