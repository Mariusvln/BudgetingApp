import BalanceCard from "./BalanceCard"
import MonthlyGrowth from "./MonthlyGrowth"
import IncomeCard from "./IncomeCard";

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
          <section className="flex flex-col justify-between gap-4 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
            <div className="flex justify-between">
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
              props.budgetGoals.map((goal) => {
                const isOverBudget = Number(goal.spent) > Number(goal.maxLimit);

                return (
                  <div key={goal.id}>
                    <div className="flex justify-between gap-4">
                      <p className={`font-semibold ${isOverBudget ? "text-error" : "text-base-content"}`}>
                        {goal.name}
                      </p>
                      <p className={isOverBudget ? "font-semibold text-error" : "text-base-content/55"}>
                        {props.formatCurrency(goal.spent)} / {props.formatCurrency(goal.maxLimit)}
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
                );
              })
            ) : (
              <div className="rounded-2xl bg-base-200 p-4 text-sm font-semibold text-base-content/55">
                No budget limits yet
              </div>
            )}
            <a
              href="/budgeting"
              className="rounded-xl bg-primary px-3 py-3 text-center font-bold text-primary-content transition hover:bg-primary/90"
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
