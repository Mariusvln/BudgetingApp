import { CircularProgressbar } from "react-circular-progressbar";
import "../../assets/styles/Dashboard.css";
import BalanceCard from "./BalanceCard"
import MonthlyGrowth from "./MonthlyGrowth"
import IncomeCard from "./IncomeCard";

const DashboardDesktop = (props) => {
  const percentage = 40;
  const incomeCards = ["Total Income", "Total Expenses", "Monthly Savings"]
  const progressBarStyles = ["progress-bar-green", "progress-bar-orange"]
  return (
    <div className="desktop-display px-6 pb-8 pt-6 md:px-8">
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
          <section className="income-cards_grid">
            <IncomeCard header={incomeCards[0]} progressStyle={progressBarStyles[0]} money={props.incomes} percentage={80}/>
            <IncomeCard header={incomeCards[1]} progressStyle={progressBarStyles[1]} money={props.expenses} percentage={40}/>
            <IncomeCard header={incomeCards[2]} progressStyle={progressBarStyles[0]} money={props.formatCurrency(4300)} percentage={60}/>
            <div className="circular-prog-card">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-base-content/55">Savings Ratio</p>
                <h3 className="my-1 text-3xl font-extrabold tracking-tight text-base-content">40.8%</h3>
                <p className="text-xs font-semibold text-base-content/40">Income kept after spending</p>
              </div>
              <div className="h-24 w-24">
              <div className="circular-prog-bar">
                <CircularProgressbar
                  value={percentage}
                  className="CircularProgressbar-trail"
                />
              </div>
              </div>
            </div>
          </section>
          <section className="saving-goals">
            <div className="saving-goal">
              <h4 className="text-lg font-bold text-base-content">Saving Goals</h4>
              <button className="add-button">+</button>
            </div>
            <div>
              <div className="saving-goal">
                <p className="font-semibold text-base-content">New Car Fund</p>
                <p className="saving-goal_amount">{props.formatCurrency(12000)} / {props.formatCurrency(25000)}</p>
              </div>
              <progress
                max="100"
                value="30"
                className="saving-goal_bar progress-bar-green"
              ></progress>
            </div>
            <div>
              <div className="saving-goal">
                <p className="font-semibold text-base-content">Emergency Fund</p>
                <p className="saving-goal_amount">{props.formatCurrency(8500)} / {props.formatCurrency(10000)}</p>
              </div>
              <progress
                max="100"
                value="80"
                className="saving-goal_bar progress-bar-green"
              ></progress>
            </div>
            <button className="view-goals">+ View All Goals</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
