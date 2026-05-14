import BalanceCard from "./BalanceCard"
import MonthlyGrowth from "./MonthlyGrowth"
import IncomeCard from "./IncomeCard";

const DashboardDesktop = (props) => {
  const percentage = 40;
  const incomeCards = ["Total Income", "Total Expenses", "Monthly Savings"]
  return (
    <div className="hidden px-6 pb-8 pt-6 min-[930px]:block md:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <BalanceCard formatCurrency={props.formatCurrency} balance={props.balance} monthlySpending={props.monthlySpending}/>
          <MonthlyGrowth
            incomes={props.incomeItems}
            expenses={props.expenseItems}
            formatCurrency={props.formatCurrency}
          />
        </section>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <section className="grid grid-cols-2 grid-rows-2 gap-6">
            <IncomeCard header={incomeCards[0]} money={props.incomes} percentage={80}/>
            <IncomeCard header={incomeCards[1]} money={props.expenses} percentage={40} tone="warning"/>
            <IncomeCard header={incomeCards[2]} money={props.formatCurrency(4300)} percentage={60}/>
            <div className="flex items-center justify-between gap-8 rounded-3xl border border-base-300 bg-base-100 px-4 py-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-base-content/55">Savings Ratio</p>
                <h3 className="my-1 text-3xl font-extrabold tracking-tight text-base-content">40.8%</h3>
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
              <h4 className="text-lg font-bold text-base-content">Saving Goals</h4>
              <button className="rounded-full bg-base-200 px-2 pb-1 text-base-content transition hover:bg-base-300">+</button>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-base-content">New Car Fund</p>
                <p className="text-base-content/55">{props.formatCurrency(12000)} / {props.formatCurrency(25000)}</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-base-300">
                <div className="h-full w-[30%] rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-base-content">Emergency Fund</p>
                <p className="text-base-content/55">{props.formatCurrency(8500)} / {props.formatCurrency(10000)}</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-base-300">
                <div className="h-full w-[80%] rounded-full bg-primary" />
              </div>
            </div>
            <button className="rounded-xl bg-primary px-3 py-3 font-bold text-primary-content transition hover:bg-primary/90">+ View All Goals</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
