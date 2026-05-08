import { CircularProgressbar } from "react-circular-progressbar";
import "../../assets/styles/Dashboard.css";
import BalanceCard from "./BalanceCard"
import MonthlyGrowth from "./MonthlyGrowth"
import TransactionNav from "../TransactionNav"
import IncomeCard from "./IncomeCard";

const DashboardDesktop = (props) => {
  const percentage = 40;
  const incomeCards = ["Total Income", "Total Expenses", "Monthly Savings"]
  const progressBarStyles = ["progress-bar-green", "progress-bar-orange"]
  return (
    <div className="grow desktop-display mr-5.5">
      <div className="grow">
        <section className="flex gap-5.5 grow mb-5.5">
          <BalanceCard formatCurrency={props.formatCurrency} balance={props.balance} monthlySpending={props.monthlySpending}/>
          <MonthlyGrowth/>
        </section>
        <div className="flex grow gap-5">
          <section className="income-cards_grid basis-[450px] grow">
            <IncomeCard header={incomeCards[0]} progressStyle={progressBarStyles[0]} money={props.incomes} percentage={80}/>
            <IncomeCard header={incomeCards[1]} progressStyle={progressBarStyles[1]} money={props.expenses} percentage={40}/>
            <IncomeCard header={incomeCards[2]} progressStyle={progressBarStyles[0]} money={"$4,300.00"} percentage={60}/>
            <div className="circular-prog-card flex_center">
              <div className="flex flex-col">
                <p className="gray-text semibold">Savings Ratio</p>
                <h3 className="my-1 bold_font h3_style black-text">40.8%</h3>
              </div>
              <div className="min-h-[30%] min-w-[30%]">
              <div className="circular-prog-bar">
                <CircularProgressbar
                  value={percentage}
                  className="CircularProgressbar-trail"
                />
              </div>
              </div>
            </div>
          </section>
          <section className="saving-goals grow-2 basis-[400px]">
            <div className="saving-goal">
              <h4 className="h4_style black-text">Saving Goals</h4>
              <button className="add-button black-text">+</button>
            </div>
            <div>
              <div className="saving-goal">
                <p className="black-text">New Car Fund</p>
                <p className="saving-goal_amount">$12,000 / $25,000</p>
              </div>
              <progress
                max="100"
                value="30"
                className="saving-goal_bar progress-bar-green"
              ></progress>
            </div>
            <div>
              <div className="saving-goal">
                <p className="black-text">Emegency Fund</p>
                <p className="saving-goal_amount">$8,500 / $10,000</p>
              </div>
              <progress
                max="100"
                value="80"
                className="saving-goal_bar progress-bar-green"
              ></progress>
            </div>
            <button className="view-goals bg-green-500">+ View All Goals</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
