function ProfileAccountStatus() {
  return (
    <div className="rounded-3xl bg-base-100 p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-lg font-bold">Account Status</h3>

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-green-700">
          ✓
        </div>

        <div>
          <p className="font-semibold">Two-Factor Auth</p>
          <p className="mt-1 text-sm text-green-600">Enabled and secure</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileAccountStatus;