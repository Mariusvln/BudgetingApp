import TransactionNav from "../components/TransactionNav";
import AdminCategories from "../components/admin-page-components/AdminCategories";
import AdminUsers from "../components/admin-page-components/AdminUsers";
import AdminEvents from "../components/admin-page-components/AdminEvents";
import AdminUserActivity from "../components/admin-page-components/AdminUserActivity";

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      <div className="w-64">
        <TransactionNav />
      </div>

      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <p className="">Configure global categories and manage platform users.</p>

        <AdminCategories />
        <AdminUsers />
        <AdminEvents />
        <AdminUserActivity />
      </div>
    </div>
  );
};

export default AdminPage;
