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
    <div className="bg-base-100 rounded-2xl shadow p-6 flex items-center gap-6 mb-6">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
        {initials}
      </div>

      <div>
        <h2 className="text-xl font-semibold">{user?.name || "Unknown User"}</h2>

        <span className="inline-block mt-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          FinVue Member
        </span>

        <p className="text-gray-500 text-sm mt-1">
          Member since {memberSince} • {location}
        </p>
      </div>
    </div>
  );
}

export default ProfileHeader;