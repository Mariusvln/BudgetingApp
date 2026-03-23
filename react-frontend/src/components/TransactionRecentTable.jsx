function TransactionRecentTable() {
  const transactions = [
    {
      date: "Oct 24, 2023",
      merchant: "Starbucks",
      category: "Food & Drink",
      status: "Completed",
      amount: "-$6.50",
      icon: "./src/assets/food-icon.svg",
    },
    {
      date: "Oct 23, 2023",
      merchant: "Apple Store",
      category: "Electronics",
      status: "Pending",
      amount: "-$1,299.00",
      icon: "./src/assets/electric-icon.svg",
    },
    {
      date: "Oct 22, 2023",
      merchant: "Employer Inc",
      category: "Salary",
      status: "Completed",
      amount: "+$4,500.00",
      icon: "./src/assets/analytics-icon.svg",
    },
    {
      date: "Oct 21, 2023",
      merchant: "Landlord Corp",
      category: "Rent",
      status: "Completed",
      amount: "-$2,100.00",
      icon: "./src/assets/rent-icon.svg",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Completed") return "badge-success";
    if (status === "Pending") return "badge-warning";
    return "badge-neutral";
  };

  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="text-sm text-gray-500">
              You have 128 transactions this month
            </p>
          </div>

          <div className="tabs bg-base-200 rounded-field w-fit space-x-1 overflow-x-auto p-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
            <button
              type="button"
              class="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary active hover:bg-transparent"
              id="tabs-segment-item-1"
              data-tab="#tabs-segment-1"
              aria-controls="tabs-segment-1"
              role="tab"
              aria-selected="true"
            >
              All
            </button>
            <button
              type="button"
              class="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary hover:bg-transparent"
              aria-selected="false"
            >
              Income
            </button>
            <button
              type="button"
              class="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary hover:bg-transparent"
              id="tabs-segment-item-3"
              data-tab="#tabs-segment-3"
              aria-controls="tabs-segment-3"
              role="tab"
              aria-selected="false"
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th>Date</th>
                <th>Merchant</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td className="text-sm text-gray-500">{t.date}</td>

                  <td className="font-medium">{t.merchant}</td>

                  <td>
                    <span className="badge badge-soft text-xs">
                      {t.category}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge badge-soft text-xs ${getStatusColor(
                        t.status,
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td
                    className={`text-right font-medium ${
                      t.amount.startsWith("+")
                        ? "text-green-500"
                        : "text-gray-700"
                    }`}
                  >
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">Showing 1 to 6 of 128 results</p>

          <div className="">
            <button className="btn btn-sm mr-2">Previous</button>
            <button className="btn btn-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionRecentTable;
