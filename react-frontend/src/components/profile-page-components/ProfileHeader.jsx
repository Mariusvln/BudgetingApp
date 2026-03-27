function ProfileHeader() {
  return (
    <div className="bg-base-100 rounded-2xl shadow p-6 flex items-center gap-6 mb-6">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
        AS
      </div>

      <div>
        <h2 className="text-xl font-semibold">Alex Sterling</h2>
        <span className="inline-block mt-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          FinVue Member
        </span>
        <p className="text-gray-500 text-sm mt-1">
          Member since January 2026 • Lithuania 
        </p>
      </div>
    </div>
  );
}

export default ProfileHeader