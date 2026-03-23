import '../styles/LoginPageStyle.css';

const LoginPage = () => {
  return (
    <div className="LoginPage w-[424px] mx-auto mt-20">
      <div className="bg-card border border-card-line rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[715px] -translate-x-[8px] -translate-y-[20px]">
        <div className="flex-1 px-6 pt-6 pb-8">
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400">
                <span className="text-lg font-bold text-black">F</span>
              </div>
              <span className="text-[28px] font-semibold text-foreground">FinVue</span>
            </div>

            <h3 id="hs-modal-signin-label" className="text-[38px] leading-none font-bold text-foreground">
              Sign in
            </h3>

            <p className="mt-4 text-[18px] leading-8 text-muted-foreground-2 text-gray-500">
              Welcome back! Please enter your
              <br />
              details.
            </p>
          </div>

          <div className="mb-6 border-t border-card-line" />

          <form>
            <div className="grid gap-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:pointer-events-none disabled:opacity-50 border-card-line bg-[#f8fafc]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground ">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:pointer-events-none disabled:opacity-50 border-card-line bg-[#f8fafc]"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:pointer-events-none disabled:opacity-50 border-card-line bg-[#f8fafc]"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label htmlFor="checkbox" className="flex items-center text-sm text-foreground">
                  <input
                    id="checkbox"
                    name="checkbox"
                    type="checkbox"
                    className="shrink-0 size-4 rounded-sm border border-line-3 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 checked:border-primary-checked checked:bg-primary-checked disabled:pointer-events-none disabled:opacity-50 border-card-line bg-[#f8fafc]"
                  />
                  <span className="ms-3">Remember me</span>
                </label>

                <a href="#" className="text-sm font-medium text-green-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-green-400 px-4 py-3 text-base font-semibold text-black hover:opacity-90"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="bottomWindow flex min-h-[72px] items-center justify-center border-t border-card-line bg-[#F8FAFC] px-6 py-6 border-gray-400">
          <p className="text-center text-sm text-muted-foreground-2">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-green-500 hover:underline">
              Sign up for free </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;