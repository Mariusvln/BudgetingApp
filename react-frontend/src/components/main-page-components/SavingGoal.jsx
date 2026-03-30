import "../../assets/styles/Dashboard.css";

const SavingGoal = () => {
  return (
    <section className="flex_col flex_center saving-goal_mobile">
      <div className="flex_between">
        <div>
          <div className="flex_between gap-22 text-gray-500">
            <h4 className="black-text h4_style">Saving Goal</h4>
            <p className="bold_font">$2,300.00</p>
          </div>
          <h2 className="black-text bold_font text-3xl">$1,840.00</h2>
        </div>
        <div className="self-center">
          <button className="green-text bold_font saving-goal_button">
            {">"}
          </button>
        </div>
      </div>
      <progress
        max="100"
        value="80"
        className="progress-bar-green h-2 w-[100%]"
      ></progress>
    </section>
  );
};

export default SavingGoal;
