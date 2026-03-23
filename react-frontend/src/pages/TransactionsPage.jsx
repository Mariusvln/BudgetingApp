import TransactionNav from "../components/TransactionNav";
import TransactionHeader from "../components/TransactionHeader";
import TransactionRecentTable from "../components/TransactionRecentTable";
import TransactionAddPanel from "../components/TransactionAddPanel";

function TransactionsPage() {
  return (
    <div className="flex bg-base-200">
      <TransactionNav />

      <div className="flex-1 p-6">
        <TransactionHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionRecentTable />
          </div>

          <TransactionAddPanel />
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;