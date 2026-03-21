function TransactionNav() {
  return (
    <aside className="w-64 min-h-screen border-r border-base-200 bg-white flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-green-500">FinVue</h1>
      </div>

      {/* Menu */}
      <ul className="menu px-2 flex-1">
        <li>
          <a>
            <img src="./src/assets/home-icon.svg" className="w-5" />
            Home
          </a>
        </li>
        <li>
          <a className="active">
            <img src="./src/assets/transaction-icon.svg" className="w-5" />
            Transactions
          </a>
        </li>
        <li>
          <a>
            <img src="./src/assets/budgets-icon.svg" className="w-5" />
            Budgets
          </a>
        </li>
        <li>
          <a>
            <img src="./src/assets/analytics-icon.svg" className="w-5" />
            Analytics
          </a>
        </li>
        <li>
          <a>
            <img src="./src/assets/user-icon.svg" className="w-5" />
            Profile
          </a>
        </li>
        <li>
          <a>
            <img src="./src/assets/settings-icon.svg" className="w-5" />
            Settings
          </a>
        </li>
      </ul>

      {/* User */}
      <div className="p-4 border-t flex items-center gap-3">
        <img
          src="./src/assets/avatar-icon.svg"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-sm">user.name</p>
          <p className="text-xs text-gray-500">user.email</p>
        </div>
      </div>
    </aside>
  );
}

export default TransactionNav;