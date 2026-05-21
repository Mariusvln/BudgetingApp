import BalanceCard from "./BalanceCard"
import MonthlyGrowth from "./MonthlyGrowth"
import IncomeCard from "./IncomeCard";

const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <rect x="6" y="5" width="12" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M9 3v4M15 3v4M9 10h6M9 14h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DashboardDesktop = (props) => {
  const percentage = Math.min(Math.max(Math.round(props.savingsRatio || 0), 0), 100);
  const incomePercentage = Math.min(Math.max(Math.round(props.incomeProgress || 0), 0), 100);
  const expensePercentage = Math.min(Math.max(Math.round(props.expensesRatio || 0), 0), 100);
  const incomeCards = ["Total Income", "Total Expenses", "Monthly Savings"]

  return (
    <div className="hidden px-6 pb-8 pt-6 lg:block md:px-8">
      <div className="mx-auto max-w-7xl">
        {props.error ? (
          <div className="mb-6 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm font-semibold text-error">
            {props.error}
          </div>
        ) : null}
        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <BalanceCard
            formatCurrency={props.formatCurrency}
            balance={props.loading ? 0 : props.balance}
            monthlySpending={props.loading ? 0 : props.monthlySpending}
          />
          <MonthlyGrowth
            incomes={props.incomeItems}
            expenses={props.expenseItems}
            formatCurrency={props.formatCurrency}
          />
        </section>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <section className="grid grid-cols-2 grid-rows-2 gap-6">
            <IncomeCard header={incomeCards[0]} money={props.incomes} percentage={incomePercentage}/>
            <IncomeCard header={incomeCards[1]} money={props.expenses} percentage={expensePercentage} tone="warning"/>
            <IncomeCard
              header={incomeCards[2]}
              money={props.formatCurrency(props.monthlySavings)}
              percentage={percentage}
            />
            <div className="flex items-center justify-between gap-8 rounded-3xl border border-base-300 bg-base-100 px-4 py-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-base-content/55">Savings Ratio</p>
                <h3 className="my-1 text-3xl font-extrabold tracking-tight text-base-content">
                  {percentage}%
                </h3>
                <p className="text-xs font-semibold text-base-content/40">Income kept after spending</p>
              </div>
              <div
                className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(var(--color-primary) ${percentage}%, var(--color-base-300) 0)`,
                }}
              >
                <div className="grid h-16 w-16 place-items-center rounded-full bg-base-100 text-sm font-extrabold text-base-content">
                  {percentage}%
                </div>
              </div>
            </div>
          </section>
          <section className="flex max-h-[430px] flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
            <div className="flex shrink-0 justify-between">
              <h4 className="text-lg font-bold text-base-content">Budget Limits</h4>
              <a
                href="/budgeting"
                aria-label="Add budget limit"
                className="grid h-7 w-7 place-items-center rounded-full bg-base-200 text-base-content transition hover:bg-base-300"
              >
                +
              </a>
            </div>
            {props.budgetGoals?.length ? (
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-3">
              {props.budgetGoals.map((goal) => {
                const isOverBudget = Number(goal.spent) > Number(goal.maxLimit);

                return (
                  <article
                    key={goal.id}
                    className="rounded-2xl border border-base-300 bg-base-200/55 p-3 transition hover:bg-base-200"
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
                            <p className={`truncate text-sm font-extrabold ${
                              isOverBudget ? "text-error" : "text-base-content"
                            }`}>
                              {goal.name}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-base-content/50">
                              Limit · {props.formatCurrency(goal.maxLimit)}
                            </p>
                          </div>
                          <p className={`shrink-0 text-sm font-bold ${
                            isOverBudget ? "text-error" : "text-base-content/65"
                          }`}>
                            {props.formatCurrency(goal.spent)}
                          </p>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-base-300">
                          <div
                            className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                              isOverBudget ? "bg-error" : "bg-primary"
                            }`}
                            style={{ width: `${goal.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
              }
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-base-200 p-4 text-sm font-semibold text-base-content/55">
                No budget limits yet
              </div>
            )}
            <a
              href="/budgeting"
              className="shrink-0 rounded-xl bg-primary px-3 py-3 text-center font-bold text-primary-content transition hover:bg-primary/90"
            >
              + View Budgeting
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
