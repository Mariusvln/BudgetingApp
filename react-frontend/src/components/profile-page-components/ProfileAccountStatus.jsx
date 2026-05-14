import { useTheme } from "../../contexts/useTheme";

function ProfileAccountStatus() {
  const { theme } = useTheme();

  const isValentineTheme = theme === "valentine";

  const iconClass = isValentineTheme
    ? "bg-pink-100 text-pink-800"
    : "bg-primary/15 text-primary";

  const statusTextClass = isValentineTheme
    ? "text-pink-800"
    : "text-primary";

  return (
    <div className="rounded-3xl bg-base-100 p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-lg font-bold">Account Status</h3>

      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${iconClass}`}
        >
          ✓
        </div>

        <div>
          <p className="font-semibold">Two-Factor Auth</p>
          <p className={`mt-1 text-sm ${statusTextClass}`}>
            Enabled and secure
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileAccountStatus;
