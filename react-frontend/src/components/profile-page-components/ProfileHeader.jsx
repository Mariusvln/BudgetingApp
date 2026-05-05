function getInitials(name) {
  if (!name || !name.trim()) return "U";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function formatMemberSince(createdAt) {
  if (!createdAt) return "Unknown";

  const date = new Date(createdAt);

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function ProfileHeader({ user }) {
  const initials = getInitials(user?.name);
  const memberSince = formatMemberSince(user?.createdAt);
  const location = user?.location?.trim() ? user.location : "Location not set";

  return (
    <div className="mb-5 rounded-3xl bg-base-100 p-5 shadow-sm sm:p-6 md:mb-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-xl font-bold text-green-700 sm:h-20 sm:w-20 sm:rounded-full">
            {initials}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold sm:text-2xl">
              {user?.name || "Unknown User"}
            </h2>

            <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 sm:text-sm">
              FinVue Member
            </span>

            <p className="mt-2 text-sm text-gray-500">
              Member since {memberSince}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-base-200 px-4 py-3 text-sm text-gray-600 sm:text-right">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Location
          </p>
          <p className="font-semibold text-base-content">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;