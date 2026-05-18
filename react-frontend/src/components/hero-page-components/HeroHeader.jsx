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
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-blue-100/70 bg-white/90 p-5 backdrop-blur">
        <div>
          <h1 className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-3xl font-extrabold text-transparent">
            FinVue
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={SignInClick}
            className="rounded-xl border border-blue-100 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-700 sm:px-6"
          >
            Sign In
          </button>
          <button
            onClick={RegisterClick}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:px-6"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroHeader;
