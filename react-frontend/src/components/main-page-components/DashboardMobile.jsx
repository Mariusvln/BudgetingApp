import listIcon from "../../assets/images/icons/list-icon.svg";
import statsIcon from "../../assets/images/icons/stats-icon.svg";
import piggybankIcon from "../../assets/images/icons/piggybank-icon.svg";
import AccountCard from "./AccountCard";
import SavingGoal from "./SavingGoal";

const DashboardMobile = ({balance}) => {
  return (
    <div className="flex flex-col justify-center gap-7 min-[930px]:hidden">
      <AccountCard balance={balance}/>
      <SavingGoal/>
      <nav className="mx-2 flex justify-between">
        <div>
          <button className="rounded-xl bg-blue-100 px-5 py-5 transition hover:bg-blue-200">
            <img src={listIcon} alt="list icon" className="w-4.5 h-5" />
          </button>
          <p className="mt-1 text-center text-sm font-semibold text-base-content/60">Bills</p>
        </div>
        <div>
          <button className="rounded-xl bg-orange-100 px-5 py-5 transition hover:bg-orange-200">
            <img src={statsIcon} alt="stats icon" className="w-4.5 h-5" />
          </button>
          <p className="mt-1 text-center text-sm font-semibold text-base-content/60">Stats</p>
        </div>
        <div>
          <button className="rounded-xl bg-purple-100 px-5 py-5 transition hover:bg-purple-200">
            <img
              src={piggybankIcon}
              alt="piggybank icon"
              className="w-4.5 h-5"
            />
          </button>
          <p className="mt-1 text-center text-sm font-semibold text-base-content/60">Vaults</p>
        </div>
        <div>
          <button className="rounded-xl bg-primary/15 px-5 py-3.5 text-2xl font-semibold text-primary transition hover:bg-primary/25">+</button>
          <p className="mt-1 text-center text-sm font-semibold text-base-content/60">Add</p>
        </div>
      </nav>
    </div>
  );
};

export default DashboardMobile;
