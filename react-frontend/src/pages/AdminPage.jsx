import TransactionNav from "../components/TransactionNav";

const AdminPage = () => {
  return (
    <>
      <div className="flex min-h-screen bg-base-200">
        <div className="w-64">
          <TransactionNav />
        </div>
        <h1>ADMIN PAGE</h1>
      </div>
    </>
  );
};

export default AdminPage;
