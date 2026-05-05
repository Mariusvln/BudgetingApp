import "../../assets/styles/Dashboard.css";

const BalanceCard = ({formatCurrency, balance, monthlySpending}) => {

  return (
    <div className="balance-card-bg p-[32px] min-h-[240px] flex flex-col grow-30 basis-[600px] justify-center gap-[5%]">
      <div className="flex items-center gap-1.5 text-sm text-center black-text semibold bg-[#0000001a] pl-3 py-0.5 w-23 rounded-2xl">
        <span className="badge size-2 p-0 mt-0.5 bg-black"></span>
        SYNCED
      </div>
      <div>
        <p className="tracking-wide semibold text-[#0F172AB2]">Total Balance</p>
        <h1 className="bold-font text-6xl black-text tracking-tight">
          {formatCurrency(balance)}
        </h1>
      </div>
      <div>
        <h5 className="semibold text-lg mt-3 text-[#0F172AB2]">
          MONTHLY SPENDING
        </h5>
        <h4 className="black-text bold-font text-2xl">
          {formatCurrency(monthlySpending)}
        </h4>
      </div>
    </div>
  );
};

export default BalanceCard;
