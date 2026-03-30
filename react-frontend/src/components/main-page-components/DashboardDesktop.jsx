import { CircularProgressbar } from "react-circular-progressbar";
import "../../assets/styles/Dashboard.css";
import BalanceCard from "./BalanceCard"
import MonthlyGrowth from "./MonthlyGrowth"
import TransactionNav from "../TransactionNav"

const DashboardDesktop = () => {
  const percentage = 40;
  return (
    <div className="flex justify-between gap-7 desktop-display">
      <TransactionNav />
      <div className="flex flex-col gap-5 justify-center items-center">
        <section className="flex gap-5.5">
          <BalanceCard/>
          <MonthlyGrowth/>
        </section>
        <div className="flex gap-5">
          <section className="income-cards_grid">
            <div className="income-card flex_center">
              <p className="gray-text semibold">Total Income</p>
              <h3 className="income-card_title bold_font h3_style black-text">
                $8,500.00
              </h3>
              <progress
                max="100"
                value="80"
                className="income-card_prog-bar progress-bar-green"
              ></progress>
            </div>
            <div className="income-card flex_center">
              <p className="gray-text semibold">Total Expenses</p>
              <h3 className="income-card_title bold_font h3_style black-text">
                $4,200.00
              </h3>
              <progress
                max="100"
                value="40"
                className="income-card_prog-bar bold_font progress-bar-orange"
              ></progress>
            </div>
            <div className="income-card flex_center">
              <p className="gray-text semibold">Monthly Savings</p>
              <h3 className="income-card_title bold_font h3_style black-text">
                $4,300.00
              </h3>
              <progress
                max="100"
                value="60"
                className="income-card_prog-bar progress-bar-green"
              ></progress>
            </div>
            <div className="circular-prog-card flex_center">
              <div className="flex flex-col">
                <p className="gray-text semibold">Savings Ratio</p>
                <h3 className="my-1 bold_font h3_style black-text">40.8%</h3>
              </div>
              <div className="circular-prog-bar">
                <CircularProgressbar
                  value={percentage}
                  className="CircularProgressbar-trail"
                />
              </div>
            </div>
          </section>
          <section className="saving-goals">
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
      <div></div>
    </div>
  );
};

export default DashboardDesktop;
