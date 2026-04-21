function ProfilePersonalInformation({ formData, onChange }) {
  return (
    <div className="lg:col-span-2 bg-base-100 rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border-gray-200 bg-base-200 p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border-gray-200 bg-base-200 p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Enter your location"
            className="mt-1 w-full rounded-lg border-gray-200 bg-base-200 p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Preferred Currency</label>
          <select className="mt-1 w-full rounded-lg border-gray-200 bg-base-200 p-3">
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProfilePersonalInformation;