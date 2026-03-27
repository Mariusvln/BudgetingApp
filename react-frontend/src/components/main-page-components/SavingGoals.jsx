import "../../assets/styles/Dashboard.css";

const SavingGoals = () => {
    return (
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
    )
}

export default SavingGoals