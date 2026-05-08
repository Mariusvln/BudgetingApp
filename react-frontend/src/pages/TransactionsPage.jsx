import TransactionNav from "../components/TransactionNav";
import TransactionHeader from "../components/transaction-page-components/TransactionHeader";
import TransactionRecentTable from "../components/transaction-page-components/TransactionRecentTable";
import TransactionAddPanel from "../components/transaction-page-components/TransactionAddPanel";

function TransactionsPage() {
  return (
    <div className="transactions-page flex min-h-screen bg-base-200 md:ml-64">
      <TransactionNav />

      <div className="transactions-page__content flex-1 p-6 pb-28 md:pb-6">
        {/* <TransactionHeader /> */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionRecentTable />
          </div>

          {/* <TransactionAddPanel /> */}
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
