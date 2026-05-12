import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/useTheme";

import budgetIcon from "../assets/images/icons/budget.png";
import adminIcon from "../assets/images/icons/admin.png";
import expenseIcon from "../assets/images/icons/expense.png";
import transactionIcon from "../assets/images/icons/transaction-icon.svg";
import analyticsIcon from "../assets/images/icons/analytics-icon.svg";
import incomeIcon from "../assets/images/icons/rent-icon.svg";
import userIcon from "../assets/images/icons/user-icon.svg";

function TransactionNav() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const isValentineTheme = theme === "valentine";

  const logoClass = isValentineTheme
    ? "from-[#831843] to-[#BE185D]"
    : "from-[#22C55E] to-[#15803D]";

  const activeLinkClass = isValentineTheme
    ? "bg-pink-100 text-pink-900 shadow-sm"
    : "bg-green-50 text-green-700 shadow-sm";

  const activeIconClass = isValentineTheme
    ? "bg-pink-200"
    : "bg-green-100";

  const mobileActiveLinkClass = isValentineTheme
    ? "bg-pink-100 text-pink-900"
    : "bg-green-50 text-green-700";

  const mobileActiveIconClass = isValentineTheme
    ? "bg-pink-200"
    : "bg-green-100";

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

  const currentPath = window.location.pathname;

  function getInitials(name) {
    if (!name || !name.trim()) return "U";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-base-300 bg-base-100 md:flex">
        <div className="border-b border-base-200 px-6 py-6">
          <h1
            className={`bg-linear-to-r ${logoClass} bg-clip-text text-3xl font-bold text-transparent`}
          >
            FinVue
          </h1>

          <p className="mt-1 text-sm text-base-content/50">
            Finance dashboard
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
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
                        ? activeLinkClass
                        : "text-base-content hover:bg-base-200"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isActive
                          ? activeIconClass
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-300 text-sm font-bold ring ring-base-300 ring-offset-2 ring-offset-base-100">
                {getInitials(user?.name)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-base-content">
                  {user?.name || "No name"}
                </p>

                <p className="truncate text-xs text-base-content/50">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 overflow-x-auto border-t border-base-300 bg-base-100/95 px-3 pb-3 pt-2 shadow-2xl backdrop-blur md:hidden">
        <ul className="flex min-w-max gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <li key={item.label} className="w-24 shrink-0">
                <a
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
                    isActive
                      ? mobileActiveLinkClass
                      : "text-base-content/60 hover:bg-base-200"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isActive ? mobileActiveIconClass : "bg-base-200"
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
    </>
  );
}

export default TransactionNav;
