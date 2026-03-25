import listIcon from "../../assets/images/icons/list-icon.svg";
import statsIcon from "../../assets/images/icons/stats-icon.svg";
import piggybankIcon from "../../assets/images/icons/piggybank-icon.svg";
import "../../assets/styles/Dashboard.css";
import AccountCard from "./AccountCard";
import SavingGoal from "./SavingGoal";

const DashboardMobile = () => {
  return (
    <div className="flex_col flex_center gap-7 mobile-display">
      <AccountCard/>
      <SavingGoal/>
      <nav className="flex_between mx-2">
        <div>
          <button className="bg-[#DBEAFE] nav_button_style hover:bg-[#bdd7fa]">
            <img src={listIcon} alt="list icon" className="w-4.5 h-5" />
          </button>
          <p className="nav_element_style">Bills</p>
        </div>
        <div>
          <button className="bg-[#FFEDD5] nav_button_style hover:bg-[#ffdcad]">
            <img src={statsIcon} alt="stats icon" className="w-4.5 h-5" />
          </button>
          <p className="nav_element_style">Stats</p>
        </div>
        <div>
          <button className="bg-[#F3E8FF] nav_button_style hover:bg-[#e0c3ff]">
            <img
              src={piggybankIcon}
              alt="piggybank icon"
              className="w-4.5 h-5"
            />
          </button>
          <p className="nav_element_style">Vaults</p>
        </div>
        <div>
          <button className="nav_button_plus green-text semibold">+</button>
          <p className="nav_element_style">Add</p>
        </div>
      </nav>
    </div>
  );
};

export default DashboardMobile;
