import { useNavigate } from "react-router";

function HeroHeader() {
  const navigate = useNavigate();

  const RegisterClick = () => {
    navigate("/signup");
  };

  const SignInClick = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-blue-100/70 bg-white/90 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
        <div className="min-w-0">
          <h1 className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
            FinVue
          </h1>
        </div>
        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button
            onClick={SignInClick}
            className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-700 sm:px-6 sm:py-3 sm:text-base"
          >
            Sign In
          </button>
          <button
            onClick={RegisterClick}
            className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:px-6 sm:py-3 sm:text-base"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroHeader;
