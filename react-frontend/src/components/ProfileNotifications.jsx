function ProfileNotifications() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Push Notifications</p>
          <p className="text-sm text-gray-500">
            Alerts for transactions & insights
          </p>
        </div>
        <input type="checkbox" className="toggle toggle-success" defaultChecked />
      </div>
    </div>
  );
}

export default ProfileNotifications