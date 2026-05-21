import React from "react";

function TransactionRecentTable({ transactions, loading, dateStart, dateEnd, setDateStart, setDateEnd }) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold">Income History</h2>
            <p className="text-sm text-base-content/60">
              {loading ? "Loading..." : `Showing ${transactions.length} entries`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="form-control">
              <label className="label py-0"><span className="label-text text-xs">Start</span></label>
              <input 
                type="date" 
                className="input input-bordered input-sm border-base-300 bg-base-100 text-base-content"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label py-0"><span className="label-text text-xs">End</span></label>
              <input 
                type="date" 
                className="input input-bordered input-sm border-base-300 bg-base-100 text-base-content"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-sm text-base-content/55">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-base-200/45">
                    <td className="font-mono text-xs text-base-content/45">#{t.id}</td>
                    <td className="text-sm text-base-content/60">{t.date}</td>
                    <td className="text-sm font-medium text-base-content">{t.description}</td>
                    <td>
                      <span className="badge border-primary/15 bg-primary/10 text-xs text-primary">
                        Cat: {t.category}
                      </span>
                    </td>
                    <td className="text-right font-medium text-success">
                      +${t.amount?.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && transactions.length === 0 && (
            <div className="py-10 text-center text-base-content/40">No data found for this range</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionRecentTable;
