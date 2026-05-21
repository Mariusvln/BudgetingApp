import TransactionNav from "../components/TransactionNav";
import TransactionRecentTable from "../components/transaction-page-components/TransactionRecentTable";

function TransactionsPage() {
  return (
    <div className="transactions-page flex min-h-screen bg-base-200 lg:ml-64">
      <TransactionNav />

      <div className="transactions-page__content w-full flex-1 p-4 pb-28 sm:p-6 lg:pb-6">
        <TransactionRecentTable />
      </div>
    </div>
  );
}

export default TransactionsPage;
