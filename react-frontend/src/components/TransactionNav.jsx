function TransactionNav() {
  return (
    <aside className="w-64 min-h-screen border-r border-base-300 bg-base-100 flex flex-col">
      
      <div className="p-4">
        <h1 className="text-3xl font-bold bg-linear-to-r from-[#22C55E] to-[#15803D] bg-clip-text text-transparent">FinVue</h1>
      </div>

      
      <ul className="menu px-2 flex-1">
        <li>
          <a href="http://localhost:5173/main">
            <img src="./src/assets/images/icons/home-icon.svg" className="w-5" />
            Main
          </a>
        </li>
        <li>
          <a href="http://localhost:5173/dashboard">
            <img src="./src/assets/images/icons/transaction-icon.svg" className="w-5" />
            Transactions
          </a>
        </li>
        {/* <li>
          <a href="http://localhost:5173/dashboard">
            <img src="./src/assets/images/icons/budgets-icon.svg" className="w-5" />
            Budgets
          </a>
        </li> */}
        <li>
          <a href="http://localhost:5173/analytics">
            <img src="./src/assets/images/icons/analytics-icon.svg" className="w-5" />
            Analytics
          </a>
        </li>
        <li>
          <a href="http://localhost:5173/profile">
            <img src="./src/assets/images/icons/user-icon.svg" className="w-5" />
            Profile
          </a>
        </li>
        {/* <li>
          <a href="http://localhost:5173/settings">
            <img src="./src/assets/images/icons/settings-icon.svg" className="w-5" />
            Settings
          </a>
        </li> */}
      </ul>

      
      <div className="p-4 border-t flex items-center gap-3">
        <img
          src="./src/assets/images/icons/avatar-icon.svg"
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