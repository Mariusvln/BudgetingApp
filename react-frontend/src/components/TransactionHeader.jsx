function TransactionHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="w-full max-w-xl">
        <input
          type="text"
          placeholder="Search transactions, merchants, or categories..."
          className="input input-bordered w-full bg-base-100"
        />
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button className="btn btn-ghost btn-circle">
          <span className="icon-[tabler--bell] text-xl"></span>
        </button>

        <button className="btn bg-green-500 hover:bg-green-600 text-white">
          + Add Transaction
        </button>
      </div>
    </div>
  );
}

export default TransactionHeader;
