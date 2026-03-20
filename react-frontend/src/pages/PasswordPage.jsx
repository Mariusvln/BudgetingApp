import '../styles/LoginPageStyle.css';

const PasswordPage = () => {
  return (
    <div className="RegisterPage w-[424px] mx-auto mt-20">
      <div className="bg-card border border-card-line rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[515px] -translate-x-[8px] -translate-y-[20px]">
        <div className="flex-1 px-6 pt-6 pb-8">
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400">
                <span className="text-lg font-bold text-black">F</span>
              </div>
              <span className="text-[18px] font-semibold text-foreground">FinVue</span>
            </div>

            <h3 id="hs-modal-signin-label" className="text-[48px] leading-none font-bold text-foreground">
              Forgotten password
            </h3>

            <p className="mt-4 text-[16px] leading-8 text-muted-foreground-2">
              if you have forgotten your password you can enter your email and we'll send you a link
            </p>
          </div>

          <div className="mb-6 border-t border-card-line" />

          <form>
            <div className="grid gap-y-5">

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:pointer-events-none disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-green-400 px-4 py-3 text-base font-semibold text-black hover:opacity-90"
              >
                Send link
              </button>
            </div>
          </form>
        </div>

        <div className="bottomWindow flex min-h-[72px] items-center justify-center border-t border-card-line bg-[#F8FAFC] px-6 py-6">
          <p className="text-center text-sm text-muted-foreground-2">
            have an account?{' '}
            <a href="#" className="font-medium text-green-500 hover:underline">
              Sign in </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;