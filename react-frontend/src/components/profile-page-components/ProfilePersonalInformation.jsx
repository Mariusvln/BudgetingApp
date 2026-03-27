function ProfilePersonalInformation() {
  return (
    <div className="lg:col-span-2 bg-base-100 rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            type="text"
            defaultValue="Alex Sterling"
            className="mt-1 w-full rounded-lg border-gray-200 bg-base-200 p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Email Address</label>
          <input
            type="email"
            defaultValue="alex.sterling@finvue.com"
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

export default ProfilePersonalInformation