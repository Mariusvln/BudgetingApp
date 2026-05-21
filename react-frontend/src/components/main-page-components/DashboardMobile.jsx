import MonthlyGrowth from "./MonthlyGrowth";

const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <rect x="6" y="5" width="12" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M9 3v4M15 3v4M9 10h6M9 14h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DashboardMobile = ({
  balance,
  budgetGoals = [],
  error,
  expenses,
  expenseItems = [],
  formatCurrency,
  incomeItems = [],
  incomes,
  loading,
  monthlySavings,
  monthlySpending,
  savingsRatio = 0,
}) => {
  const savingsPercent = Math.min(Math.max(Math.round(savingsRatio || 0), 0), 100);

  return (
    <div className="grid gap-4 px-4 pb-6 pt-4 sm:px-6 md:grid-cols-2 md:gap-5 md:px-8 lg:hidden">
      {error ? (
        <div className="rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm font-semibold text-error md:col-span-2">
          {error}
        </div>
      ) : null}

      <section className="relative overflow-hidden rounded-2xl border border-primary/35 bg-[radial-gradient(circle_at_12%_10%,rgb(255_255_255_/_0.26),transparent_9rem),linear-gradient(145deg,color-mix(in_oklch,var(--color-primary)_92%,black),var(--color-primary))] p-5 text-primary-content shadow-[0_18px_42px_color-mix(in_oklch,var(--color-primary)_18%,transparent)] md:col-span-2">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary-content/20 blur-2xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-content/70">
              Total Balance
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              {loading ? formatCurrency(0) : balance}
            </h2>
          </div>
          <div className="rounded-full bg-primary-content/18 px-3 py-1 text-xs font-bold backdrop-blur">
            {savingsPercent}%
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary-content/14 p-3 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-content/60">
              Spending
            </p>
            <p className="mt-1 text-lg font-extrabold">
              {formatCurrency(loading ? 0 : monthlySpending)}
            </p>
          </div>
          <div className="rounded-xl bg-primary-content/14 p-3 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-content/60">
              Savings
            </p>
            <p className="mt-1 text-lg font-extrabold">
              {formatCurrency(loading ? 0 : monthlySavings)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-4">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-base-content/45">
            Income
          </p>
          <p className="mt-2 text-xl font-extrabold text-base-content">
            {loading ? formatCurrency(0) : incomes}
          </p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-base-content/45">
            Expenses
          </p>
          <p className="mt-2 text-xl font-extrabold text-base-content">
            {loading ? formatCurrency(0) : expenses}
          </p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-base-content/45">
            Saved
          </p>
          <p className="mt-2 text-xl font-extrabold text-base-content">
            {formatCurrency(loading ? 0 : monthlySavings)}
          </p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-base-content/45">
            Ratio
          </p>
          <p className="mt-2 text-xl font-extrabold text-base-content">
            {savingsPercent}%
          </p>
        </div>
      </section>

      <section className="md:col-span-2">
        <MonthlyGrowth
          incomes={incomeItems}
          expenses={expenseItems}
          formatCurrency={formatCurrency}
        />
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:col-span-2">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-base-content">Budget Limits</h3>
          <a
            href="/budgeting"
            className="rounded-xl bg-base-200 px-3 py-2 text-sm font-bold text-base-content transition hover:bg-base-300"
          >
            View
          </a>
        </div>

        {budgetGoals.length ? (
          <div className="max-h-[360px] overflow-y-auto pr-1">
          <div className="grid gap-3 md:grid-cols-2">
            {budgetGoals.map((goal) => {
              const isOverBudget = Number(goal.spent) > Number(goal.maxLimit);

              return (
                <article
                  key={goal.id}
                  className="rounded-2xl border border-base-300 bg-base-200/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                      isOverBudget
                        ? "bg-error/10 text-error"
                        : "bg-base-100 text-base-content/70"
                    }`}>
                      <BudgetIcon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className={`truncate font-extrabold ${
                            isOverBudget ? "text-error" : "text-base-content"
                          }`}>
                            {goal.name}
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-base-content/45">
                            Limit · {formatCurrency(goal.maxLimit)}
                          </p>
                        </div>
                        <p className={isOverBudget ? "shrink-0 text-sm font-bold text-error" : "shrink-0 text-sm font-semibold text-base-content/60"}>
                          {formatCurrency(goal.spent)}
                        </p>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-base-300">
                        <div
                          className={`h-full rounded-full ${isOverBudget ? "bg-error" : "bg-primary"}`}
                          style={{ width: `${goal.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          </div>
        ) : (
          <div className="rounded-xl bg-base-200 p-4 text-sm font-semibold text-base-content/55">
            No budget limits yet
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardMobile;
