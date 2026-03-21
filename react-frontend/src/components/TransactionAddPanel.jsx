function TransactionAddPanel() {
  return (
    <div className="w-full max-w-sm">
      <div className="card bg-base-100 border border-base-200">
        <div className="card-body">
          <h2 className="font-semibold text-lg">Quick Add</h2>
          <p className="text-sm text-gray-500 mb-4">
            Easily log a new transaction
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="input input-bordered"
            />

            <input
              type="text"
              placeholder="$ 0.00"
              className="input input-bordered"
            />

            <input
              type="text"
              placeholder="Merchant"
              className="input input-bordered"
            />

            <select className="select select-bordered">
              <option>Select category</option>
              <option>Food</option>
              <option>Rent</option>
              <option>Salary</option>
            </select>

            <button className="btn bg-green-500 text-white hover:bg-green-600">
              Save Transaction
            </button>

            <button className="btn btn-ghost">Clear Fields</button>
          </div>

          {/* Tip */}
          <div className="mt-6 bg-green-500 text-white p-4 rounded-xl">
            <p className="text-sm">
              You've spent 15% less on Food & Drink compared to last week.
            </p>

            <button className="btn btn-sm mt-3 bg-white text-green-600">
              View Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionAddPanel;