import { useAuth } from "../contexts/AuthContext";
import budgetIcon from "../assets/images/icons/budget.png";
import adminIcon from "../assets/images/icons/admin.png";
import expenseIcon from "../assets/images/icons/expense.png";
import transactionIcon from "../assets/images/icons/transaction-icon.svg";
import analyticsIcon from "../assets/images/icons/analytics-icon.svg";
import incomeIcon from "../assets/images/icons/rent-icon.svg";
import userIcon from "../assets/images/icons/user-icon.svg";

function TransactionNav({ variant = "desktop" }) {
  const { user } = useAuth();

  const navItems = [
    {
      label: "Budgeting",
      href: "/budgeting",
      icon: budgetIcon,
    },
    {
      label: "Transactions",
      href: "/dashboard",
      icon: transactionIcon,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: analyticsIcon,
    },
    {
      label: "Incomes",
      href: "/incomes",
      icon: incomeIcon,
    },
    {
      label: "Expenses",
      href: "/expenses",
      icon: expenseIcon,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: userIcon,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: adminIcon,
    },
  ];

  const mobileNavItems = navItems.filter((item) =>
    ["Budgeting", "Transactions", "Incomes", "Profile"].includes(item.label)
  );

  const currentPath = window.location.pathname;

  function getInitials(name) {
    if (!name || !name.trim()) return "U";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  if (variant === "mobile") {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-base-300 bg-base-100/95 px-3 pb-3 pt-2 shadow-2xl backdrop-blur md:hidden">
        <ul className="grid grid-cols-4 gap-1">
          {mobileNavItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-500 hover:bg-base-200"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isActive ? "bg-green-100" : "bg-base-200"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-5 w-5 object-contain"
                    />
                  </span>

                  <span className="max-w-full truncate">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-base-300 bg-base-100">
      <div className="border-b border-base-200 px-6 py-6">
        <h1 className="bg-linear-to-r from-[#22C55E] to-[#15803D] bg-clip-text text-3xl font-bold text-transparent">
          FinVue
        </h1>
        <p className="mt-1 text-sm text-gray-400">Finance dashboard</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Navigation
        </p>

        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-700 shadow-sm"
                      : "text-gray-700 hover:bg-base-200"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-green-100"
                        : "bg-base-200 group-hover:bg-base-300"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-5 w-5 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.label}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-base-200 p-4">
        <div className="rounded-2xl bg-base-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-bold ring ring-base-300 ring-offset-2 ring-offset-base-100">
              {getInitials(user?.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-base-content">
                {user?.name || "No name"}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user?.email || "No email"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default TransactionNav;