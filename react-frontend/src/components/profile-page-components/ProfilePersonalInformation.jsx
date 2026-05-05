function ProfilePersonalInformation({ formData, onChange }) {
  return (
    <div className="rounded-3xl bg-base-100 p-5 shadow-sm sm:p-6 lg:col-span-2">
      <div className="mb-5">
        <h3 className="text-lg font-bold">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-500">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="mt-2 h-12 w-full rounded-2xl border border-base-300 bg-base-200 px-4 text-sm outline-none transition focus:border-green-400 focus:bg-base-100"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="mt-2 h-12 w-full rounded-2xl border border-base-300 bg-base-200 px-4 text-sm outline-none transition focus:border-green-400 focus:bg-base-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Enter your location"
            className="mt-2 h-12 w-full rounded-2xl border border-base-300 bg-base-200 px-4 text-sm outline-none transition focus:border-green-400 focus:bg-base-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">
            Preferred Currency
          </label>
          <select className="mt-2 h-12 w-full rounded-2xl border border-base-300 bg-base-200 px-4 text-sm outline-none transition focus:border-green-400 focus:bg-base-100">
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProfilePersonalInformation;