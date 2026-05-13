import "../../assets/styles/Dashboard.css";

const BalanceCard = ({formatCurrency, balance, monthlySpending}) => {

  return (
    <div className="balance-card-bg min-h-[260px] basis-[600px] grow-30 overflow-hidden p-8">
      <div className="relative z-10 flex w-fit items-center gap-2 rounded-full bg-base-100/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary-content/90 backdrop-blur">
        <span className="badge size-2 p-0 bg-primary-content"></span>
        SYNCED
      </div>
      <div className="relative z-10 mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-content/70">Total Balance</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-primary-content xl:text-6xl">
          {formatCurrency(balance)}
        </h1>
      </div>
      <div className="relative z-10 mt-7 rounded-2xl bg-base-100/18 p-4 text-primary-content backdrop-blur">
        <h5 className="text-xs font-bold uppercase tracking-[0.18em] text-primary-content/65">
          MONTHLY SPENDING
        </h5>
        <h4 className="mt-2 text-2xl font-extrabold">
          {formatCurrency(monthlySpending)}
        </h4>
      </div>
    </div>
  );
};

export default BalanceCard;
