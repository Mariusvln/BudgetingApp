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
  searchQuery = "",
  selectedCategory = "ALL",
  setSearchQuery,
  setSelectedCategory,
  totalCount,
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

      <div className="card hidden border border-base-300 bg-base-100 shadow-sm lg:block">
      <div className="card-body">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Cash flow
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Income History</h2>
            <p className="text-sm text-base-content/60">
              {loading
                ? "Loading..."
                : `Showing ${transactions.length} of ${totalCount ?? transactions.length} entries`}
            </p>
          </div>
            <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-bold text-success">
              Income
            </div>
          </div>

          <div className="rounded-2xl bg-base-200/60 p-3">
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(240px,1fr)_210px_160px_160px_auto]">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                Search
              </span>
              <input
                type="text"
                className="input input-bordered h-11 rounded-xl bg-base-100 text-sm"
                placeholder="Title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                Category
              </span>
              <select
                className="select select-bordered h-11 rounded-xl bg-base-100 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory?.(e.target.value)}
              >
                <option value="ALL">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                From
              </span>
              <input
                type="date"
                className="input input-bordered h-11 rounded-xl bg-base-100 text-sm"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                To
              </span>
              <input
                type="date"
                className="input input-bordered h-11 rounded-xl bg-base-100 text-sm"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="btn h-11 self-end rounded-xl border-base-300 bg-base-100 px-5"
              onClick={() => {
                setSearchQuery?.("");
                setSelectedCategory?.("ALL");
              }}
              disabled={!searchQuery.trim() && selectedCategory === "ALL"}
            >
              Reset
            </button>
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
            <div className="py-10 text-center text-base-content/40">
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
