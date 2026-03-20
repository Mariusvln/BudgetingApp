function TransactionNav() {
  return (
    <>
      <aside
        id="collapsible-mini-sidebar"
        class="sm:shadow-none overlay-open:translate-x-0 drawer drawer-start w-66 sm:absolute sm:z-0 sm:flex sm:translate-x-0 border-e border-base-content/20 bg-white"
      >
        <div class="drawer-header   py-2 w-full flex items-center justify-between gap-3">
          <h1 class="text-4xl bg-gradient-to-r from-[#22C55E] to-[#15803D] bg-clip-text text-transparent font-bold">
            FinVue
          </h1>
        </div>

        <div class="drawer-body px-2 pt-4">
          <ul class="menu p-0">
            <li>
              <a href="#">
                <span class="size-5">
                  <img src="./src/assets/home-icon.svg" alt="home-icon" />
                </span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="size-5">
                  <img
                    src="./src/assets/transaction-icon.svg"
                    alt="transaction-icon"
                  />
                </span>
                <span class="">Transactions</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="size-5">
                  <img src="./src/assets/budgets-icon.svg" alt="budgets-icon" />
                </span>
                <span class="">Budgets</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="size-5">
                  <img
                    src="./src/assets/analytics-icon.svg"
                    alt="analytics-icon"
                  />
                </span>
                <span class="">Analytics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="size-5">
                  <img src="./src/assets/user-icon.svg" alt="user-icon" />
                </span>
                <span class="">Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="size-5">
                  <img
                    src="./src/assets/settings-icon.svg"
                    alt="settings-icon"
                  />
                </span>
                <span class="">Settings</span>
              </a>
            </li>
          </ul>
          <div className="flex justify-stretch">
            <a href="#" className="border-t-2 rounded-t-none flex absolute bottom-0">
              <span class="size-10">
                <img src="./src/assets/avatar-icon.svg" alt="settings-icon" />
              </span>
              <span class="">
                <p className="font-bold">user.name</p>
                <p className="text-[#64748B]">user.email</p>
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

export default TransactionNav;
