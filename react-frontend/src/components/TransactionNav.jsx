import { useAuth } from "../contexts/AuthContext";
import budgetIcon from "../assets/images/icons/budget.png";
import adminIcon from "../assets/images/icons/admin.png";
import expenseIcon from "../assets/images/icons/expense.png";
import homeIcon from "../assets/images/icons/home-icon.svg";
import transactionIcon from "../assets/images/icons/transaction-icon.svg";
import analyticsIcon from "../assets/images/icons/analytics-icon.svg";
import incomeIcon from "../assets/images/icons/rent-icon.svg";
import userIcon from "../assets/images/icons/user-icon.svg";

function TransactionNav() {
  const { user } = useAuth();

  const navItems = [
    {
      label: "Budgeting",
      href: "http://localhost:5173/budgeting",
      icon: budgetIcon,
    },
    // {
    //   label: "Main",
    //   href: "http://localhost:5173/main",
    //   icon: homeIcon,
    // },
    {
      label: "Transactions",
      href: "http://localhost:5173/dashboard",
      icon: transactionIcon,
    },
    {
      label: "Analytics",
      href: "http://localhost:5173/analytics",
      icon: analyticsIcon,
    },
    {
      label: "Incomes",
      href: "http://localhost:5173/incomes",
      icon: incomeIcon,
    },
    {
      label: "Expenses",
      href: "http://localhost:5173/expenses",
      icon: expenseIcon,
    },
    {
      label: "Profile",
      href: "http://localhost:5173/profile",
      icon: userIcon,
    },
        {
      label: "Admin",
      href: "http://localhost:5173/admin",
      icon: adminIcon,
    },
  ];

  const currentPath = window.location.pathname;

  function getInitials(name) {
    if (!name || !name.trim()) return "U";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (
    <aside className="w-64 h-screen sticky top-0 bg-base-100 border-r border-base-300 flex flex-col">
      <div className="px-6 py-6 border-b border-base-200">
        <h1 className="text-3xl font-bold bg-linear-to-r from-[#22C55E] to-[#15803D] bg-clip-text text-transparent">
          FinVue
        </h1>
        <p className="text-sm text-gray-400 mt-1">Finance dashboard</p>
      </div>

      <div className="flex-1 px-4 py-5 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">
          Navigation
        </p>

        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === new URL(item.href).pathname;

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
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-base-200">
        <div className="rounded-2xl bg-base-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold ring ring-base-300 ring-offset-2 ring-offset-base-100">
              {getInitials(user?.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-base-content truncate">
                {user?.name || "No name"}
              </p>
              <p className="text-xs text-gray-500 truncate">
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
