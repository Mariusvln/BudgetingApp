import React, { useState, useEffect, useCallback, useMemo } from "react";
import TransactionNav from "../components/TransactionNav";
import IncomeHeader from "../components/incomes-page-components/IncomeHeader";
import IncomeRecentTable from "../components/incomes-page-components/IncomeRecentTable";
import IncomeAddPanel from "../components/incomes-page-components/IncomeAddPanel";
import ExportButton from "../components/profile-page-components/ExportButton";

function IncomesPage() {
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getMonthStart = () => {
    const now = new Date();
    return formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const getMonthEnd = () => {
    const now = new Date();
    return formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  };

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [dateStart, setDateStart] = useState(() => getMonthStart());
  const [dateEnd, setDateEnd] = useState(() => getMonthEnd());
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const fetchIncomes = useCallback(
    async (start = dateStart, end = dateEnd) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
          { credentials: "include" },
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching incomes:", error);
      } finally {
        setLoading(false);
      }
    },
    [dateStart, dateEnd],
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const incomeCategories = categories.filter((cat) => cat.type === "INCOME");
  const categoryMap = useMemo(() => {
    return incomeCategories.reduce((map, category) => {
      map[Number(category.id)] = category.name;
      return map;
    }, {});
  }, [incomeCategories]);

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const categoryId = String(transaction.category);
      const categoryName = categoryMap[Number(transaction.category)] || "";
      const matchesCategory =
        selectedCategory === "ALL" || categoryId === selectedCategory;
      const matchesSearch =
        !query ||
        (transaction.description || "").toLowerCase().includes(query) ||
        categoryName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [categoryMap, searchQuery, selectedCategory, transactions]);

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== "ALL";

  return (
    <div className="transactions-page flex min-h-screen bg-base-200 lg:ml-64">
      <TransactionNav />

      <div className="transactions-page__content flex-1 p-6 pb-28 lg:pb-6">
        {/* <input
          type="text"
          placeholder="Search incomes"
          className="w-full max-w-xl px-4 py-2 mb-4 border border-gray-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
        /> */}

        <div className="hidden lg:block">
          <IncomeHeader />
        </div>

        <h2 className="mb-4 text-center text-2xl font-bold text-base-content lg:hidden">
          Incomes History
        </h2>

        <div className="mb-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm lg:hidden">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm text-base-content/60">
              Showing {filteredTransactions.length} of {transactions.length}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px_auto]">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-base-content/60">
                Search
              </span>
              <input
                type="text"
                className="input input-bordered h-11 rounded-xl border-base-300 bg-base-200/60 text-base-content placeholder:text-base-content/45"
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-base-content/60">
                Category
              </span>
              <select
                className="select select-bordered h-11 rounded-xl border-base-300 bg-base-200/60 text-base-content"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="ALL">All categories</option>
                {incomeCategories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="btn h-11 self-end rounded-xl border-base-300 bg-base-100 text-base-content/75 hover:bg-base-200 disabled:bg-base-200/80 disabled:text-base-content/45 disabled:opacity-100"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
              disabled={!hasActiveFilters}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm lg:hidden">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Date Range
          </p>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-base-content/70">From</span>
              <input
                type="date"
                className="input input-bordered h-11 rounded-xl border-base-300 bg-base-200/60 text-sm text-base-content"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-base-content/70">To</span>
              <input
                type="date"
                className="input input-bordered h-11 rounded-xl border-base-300 bg-base-200/60 text-sm text-base-content"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mb-4 lg:hidden">
          <button
            type="button"
            className="btn btn-primary h-11 w-full rounded-xl border-0"
            onClick={() => setIsAddIncomeModalOpen(true)}
          >
            Add Income
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[1800px]:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
          <div className="min-w-0">
            <IncomeRecentTable
              transactions={filteredTransactions}
              loading={loading}
              dateStart={dateStart}
              dateEnd={dateEnd}
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
              onTransactionAdded={fetchIncomes}
              categories={incomeCategories}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
              totalCount={transactions.length}
            />

            <div className="mt-4 hidden lg:block">
              <ExportButton variant="incomes" />
            </div>
          </div>

          <div className="hidden min-w-0 lg:block">
            <IncomeAddPanel
              onTransactionAdded={fetchIncomes}
              categories={incomeCategories}
            />
          </div>
        </div>

        {isAddIncomeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/45"
              onClick={() => setIsAddIncomeModalOpen(false)}
              aria-label="Close add income modal"
            />
            <div className="relative w-full max-w-sm overflow-hidden rounded-t-2xl bg-base-100 p-0">
              <button
                type="button"
                className="absolute right-3 top-2 z-10 bg-transparent p-1 text-[1.2rem] leading-none text-base-content shadow-none hover:bg-transparent"
                onClick={() => setIsAddIncomeModalOpen(false)}
                aria-label="Close quick add income modal"
              >
                x
              </button>
              <div className="mb-2 mt-3 flex justify-center">
                <div className="h-1.5 w-10 rounded-full bg-base-300" />
              </div>
              <IncomeAddPanel
                onTransactionAdded={() => {
                  fetchIncomes();
                  setIsAddIncomeModalOpen(false);
                }}
                categories={incomeCategories}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomesPage;
