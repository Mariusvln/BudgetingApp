import "../../assets/styles/Dashboard.css";
import { useAuth } from "../../contexts/AuthContext";
import { formatCurrency } from "../../utils/currency";

const SavingGoal = () => {
  const { user } = useAuth();

  return (
    <section className="flex_col flex_center saving-goal_mobile">
      <div className="flex_between">
        <div>
          <div className="flex_between gap-22 text-base-content/55">
            <h4 className="black-text h4_style">Saving Goal</h4>
            <p className="bold_font">{formatCurrency(2300, user?.currency)}</p>
          </div>
          <h2 className="black-text bold_font text-3xl">
            {formatCurrency(1840, user?.currency)}
          </h2>
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
