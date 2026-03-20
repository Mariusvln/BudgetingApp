import { CircularProgressbar } from "react-circular-progressbar";
import "../assets/styles/Dashboard.css";

const Dashboard = () => {
  const percentage = 40;
  return (
    <>
      <section className="income-cards_grid">
        <div className="income-card">
          <p className="income-card-paragraph">Total Income</p>
          <h3 className="income-card_title">$8,500.00</h3>
          <progress
            max="100"
            value="80"
            className="income-card_prog-bar progress-bar-green"
          ></progress>
        </div>
        <div className="income-card">
          <p className="income-card-paragraph">Total Expenses</p>
          <h3 className="income-card_title">$4,200.00</h3>
          <progress
            max="100"
            value="40"
            className="income-card_prog-bar progress-bar-orange"
          ></progress>
        </div>
        <div className="income-card">
          <p className="income-card-paragraph">Monthly Savings</p>
          <h3 className="income-card_title">$4,300.00</h3>
          <progress
            max="100"
            value="60"
            className="income-card_prog-bar progress-bar-green"
          ></progress>
        </div>
        <div className="circular-prog-card">
          <div className="flex flex-col">
            <p className="income-card-paragraph">Savings Ratio</p>
            <h3 className="circular-prog-card_title">40.8%</h3>
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
          <h4 className="h4_style">Saving Goals</h4>
          <button className="add-button">+</button>
        </div>
        <div>
          <div className="saving-goal">
            <p>New Car Fund</p>
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
            <p>Emegency Fund</p>
            <p className="saving-goal_amount">$8,500 / $10,000</p>
          </div>
          <progress
            max="100"
            value="80"
            className="saving-goal_bar progress-bar-green"
          ></progress>
        </div>
        <button className="view-goals">+ View All Goals</button>
      </section>
    </>
  );
};

export default Dashboard