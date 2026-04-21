import ExpenseTransaction from "./ExpenseTransaction";

function ExpenseRecentTable({ transactions, loading, dateStart, dateEnd, setDateStart, setDateEnd, onTransactionAdded }) {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Expense History</h2>
            <p className="text-sm text-gray-500">
              {loading ? "Loading..." : `Showing ${transactions.length} entries`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="form-control">
              <label className="label py-0"><span className="label-text text-xs">Start</span></label>
              <input 
                type="date" 
                className="input input-bordered input-sm" 
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label py-0"><span className="label-text text-xs">End</span></label>
              <input 
                type="date" 
                className="input input-bordered input-sm" 
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <ExpenseTransaction
                    key={t.id}
                    id={t.id}
                    date={t.date}
                    description={t.description}
                    category={t.category}
                    amount={t.amount}
                    onTransactionAdded={onTransactionAdded}
                  />
                ))
              )}
            </tbody>
          </table>

          {!loading && transactions.length === 0 && (
            <div className="text-center py-10 text-gray-400">No data found for this range</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseRecentTable;