import React, { useState, useEffect } from 'react';

function TransactionRecentTable() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const incomesUrl = 'http://localhost:8080/api/app/showAllIncomes';
    const expensesUrl = 'http://localhost:8080/api/app/showAllExpenses'; // Fixed URL here

    Promise.all([
      fetch(incomesUrl).then(res => res.json()),
      fetch(expensesUrl).then(res => res.json())
    ])
    .then(([incomes, expenses]) => {
      const merged = [
        ...incomes.map(item => ({ ...item, type: 'Income' })),
        ...expenses.map(item => ({ ...item, type: 'Expense' }))
      ];
      
      merged.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setAllTransactions(merged);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
  }, []);

  const displayedTransactions = allTransactions.filter(t => {
    if (filter === 'All') return true;
    return t.type === filter;
  });

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="text-sm text-gray-500">
              Showing {displayedTransactions.length} transactions
            </p>
          </div>

          <div className="tabs bg-base-200 rounded-field w-fit space-x-1 p-1">
            {['All', 'Income', 'Expense'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`btn btn-sm ${filter === tab ? 'btn-primary text-white' : 'btn-ghost'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th>Date</th>
                <th>Description</th>
                {/* Category header removed */}
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((t, i) => (
                <tr key={i}>
                  <td className="text-sm text-gray-500">{t.date}</td>
                  <td className="font-medium">{t.description || t.merchant}</td>
                  {/* Category data cell removed */}
                  <td className={`text-right font-medium ${t.type === 'Income' ? "text-green-500" : "text-red-500"}`}>
                    {t.type === 'Income' ? `+$${t.amount}` : `-$${t.amount}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionRecentTable;
