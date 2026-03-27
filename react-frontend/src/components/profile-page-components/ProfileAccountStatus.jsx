function ProfileAccountStatus() {
  return (
    <div className="bg-base-100 rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Account Status</h3>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
          ✓
        </div>
        <div>
          <p className="font-medium">Two-Factor Auth</p>
          <p className="text-sm text-green-600">Enabled & Secure</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileAccountStatus