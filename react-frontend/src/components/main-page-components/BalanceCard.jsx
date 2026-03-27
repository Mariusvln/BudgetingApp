import "../../assets/styles/Dashboard.css";

const BalanceCard = () => {
    return (
        <div className="balance-card-bg p-[32px] w-[600px] flex flex-col justify-between">
          <div class="flex items-center gap-1.5 text-sm text-center black-text semibold bg-[#0000001a] pl-3 py-0.5 w-23 rounded-2xl">
          <span class="badge size-2 p-0 mt-0.5 bg-black"></span>
            SYNCED
          </div>
          <p className="tracking-wide semibold text-[#0F172AB2]">Total Balance</p>
          <h1 className="bold-font text-5xl black-text">$12,450.00</h1>
          <div>
          <h5 className="text-sm semibold mt-3 tracking-tight text-[#0F172AB2]">MONTHLY SPENDING</h5>
          <p className="black-text bold-font text-lg">$3,120.40</p>
          </div>
        </div>
    )
}

export default BalanceCard