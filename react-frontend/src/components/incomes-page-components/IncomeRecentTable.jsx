import Transaction from "./Transaction";

function IncomeRecentTable({
  transactions,
  loading,
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
  onTransactionAdded,
  categories = [],
}) {
  const formatMobileDate = (dateValue) => {
    const date = new Date(dateValue);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (left, right) =>
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate();

    if (Number.isNaN(date.getTime())) return "Today";
    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatAmount = (amount) =>
    `+$${(Number(amount) || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const getCategoryName = (categoryId) =>
    categories.find((cat) => Number(cat.id) === Number(categoryId))?.name ||
    `Category #${categoryId}`;

  const mobileTransactions = transactions.slice(0, 10);

  const IncomeMobileIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M7 9.5h10" />
      <rect x="8" y="11" width="8" height="5" rx="1.5" />
      <circle cx="12" cy="13.5" r="1.2" />
    </svg>
  );

  return (
    <>
      <section className="transactions-mobile lg:hidden">
        <div className="transactions-mobile__header">
          <h2>Incomes</h2>
          <button type="button">See All</button>
        </div>

        <div className="transactions-mobile__list">
          {loading ? (
            <div className="transactions-mobile__empty">Loading incomes...</div>
          ) : mobileTransactions.length === 0 ? (
            <div className="transactions-mobile__empty">No incomes found</div>
          ) : (
            mobileTransactions.map((transaction) => {
              const categoryName = getCategoryName(transaction.category);

              return (
                <article
                  className="transactions-mobile__item"
                  key={transaction.id}
                >
                  <div className="transactions-mobile__icon transactions-mobile__icon--income">
                    <IncomeMobileIcon />
                  </div>

                  <div className="transactions-mobile__details">
                    <h3>{transaction.description || "No description"}</h3>
                    <p>
                      {categoryName} <span>&middot;</span>{" "}
                      {formatMobileDate(transaction.date)}
                    </p>
                  </div>

                  <p className="transactions-mobile__amount transactions-mobile__amount--income">
                    {formatAmount(transaction.amount)}
                  </p>
                </article>
              );
            })
          )}
        </div>
      </section>

      <div className="card hidden border border-base-200 bg-base-100 shadow-sm lg:block">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Income History</h2>
            <p className="text-sm text-gray-500">
              {loading
                ? "Loading..."
                : `Showing ${transactions.length} entries`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="form-control">
              <label className="label py-0">
                <span className="label-text text-xs">Start</span>
              </label>
              <input
                type="date"
                className="input input-bordered input-sm"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label py-0">
                <span className="label-text text-xs">End</span>
              </label>
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
                  <Transaction
                    key={t.id}
                    id={t.id}
                    description={t.description}
                    category={t.category}
                    amount={t.amount}
                    date={t.date}
                    onTransactionAdded={onTransactionAdded}
                    categories={categories}
                  />
                ))
              )}
            </tbody>
          </table>

          {!loading && transactions.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No data found for this range
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default IncomeRecentTable;
