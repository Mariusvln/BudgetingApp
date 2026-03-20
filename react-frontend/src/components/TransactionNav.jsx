function TransactionNav() {
  return (
    <aside
      id="collapsible-mini-sidebar"
      className="drawer drawer-start w-[320px] border-e border-base-content/20 bg-white sm:absolute sm:z-0 sm:flex sm:translate-x-0 sm:shadow-none overlay-open:translate-x-0"
    >
      <div className="flex min-h-screen w-full flex-col">
        <div className="drawer-header flex w-full items-center justify-between gap-3 px-6 py-4">
          <h1 className="bg-gradient-to-r from-[#22C55E] to-[#15803D] bg-clip-text text-4xl font-bold text-transparent">
            FinVue
          </h1>
        </div>

        <div className="drawer-body flex-1 px-3 pt-4">
          <ul className="menu p-0">
            <li>
              <a href="#">
                <span className="size-5">
                  <img src="./src/assets/home-icon.svg" alt="home-icon" />
                </span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="size-5">
                  <img src="./src/assets/transaction-icon.svg" alt="transaction-icon" />
                </span>
                <span>Transactions</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="size-5">
                  <img src="./src/assets/budgets-icon.svg" alt="budgets-icon" />
                </span>
                <span>Budgets</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="size-5">
                  <img src="./src/assets/analytics-icon.svg" alt="analytics-icon" />
                </span>
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="size-5">
                  <img src="./src/assets/user-icon.svg" alt="user-icon" />
                </span>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="size-5">
                  <img src="./src/assets/settings-icon.svg" alt="settings-icon" />
                </span>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t border-base-content/10 px-6 py-6">
          <a
            href="#"
            className="flex w-full items-center justify-between rounded-[20px] bg-[#F8FAFC] px-6 py-6"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-[52px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#BBF7D0]">
                <span className="text-[18px] font-bold text-[#22C55E]">JD</span>
              </div>

              <div className="min-w-0">
                <p className="text-[20px] font-semibold leading-tight text-[#0F172A]">
                  John Doe
                </p>
                <p className="mt-1 text-[16px] leading-tight text-[#64748B]">
                  Premium Member
                </p>
              </div>
            </div>

          </a>
        </div>
      </div>
    </aside>
  );
}

export default TransactionNav;