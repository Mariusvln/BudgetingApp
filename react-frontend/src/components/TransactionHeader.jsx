function TransactionHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search transactions, merchants, or categories..."
          className="input input-bordered w-full bg-base-100"
        />
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button className="btn bg-linear-to-r from-[#13EC6D] to-[#0BB855] hover:bg-linear-to-r hover:from-[#0BB855] hover:via-[#13EC6D] hover:to-[#0BB855] text-white">
          + Add Transaction
        </button>
      </div>
    </div>
  );
}

export default TransactionHeader;
