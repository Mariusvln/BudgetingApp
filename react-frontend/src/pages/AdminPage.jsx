import TransactionNav from "../components/TransactionNav";
import AdminCategories from "../components/admin-page-components/AdminCategories";
import AdminUsers from "../components/admin-page-components/AdminUsers";
import AdminEvents from "../components/admin-page-components/AdminEvents";
import AdminUserActivity from "../components/admin-page-components/AdminUserActivity";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <TransactionNav />

      <main className="min-h-screen px-4 pt-5 pb-28 sm:px-6 md:ml-64 md:px-8 md:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-5 md:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary md:hidden">
              FinVue
            </p>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              Admin Management
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-base-content/60 sm:text-base">
              Manage categories, users, events and user activity.
            </p>
          </div>

          <div className="space-y-5 md:space-y-6">
            <AdminCategories />
            <AdminUsers />
            <AdminEvents />
            <AdminUserActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
