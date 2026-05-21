import { useNavigate } from 'react-router';

function CtaSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="mt-10 rounded-3xl bg-linear-to-r from-slate-950 via-blue-950 to-indigo-950 p-6 text-center text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:mt-12 md:p-14">
      <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
        Ready to take control of your finances?
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-blue-100/80">
        Join thousands of users who have optimized their savings and reached their goals with FinVue.
      </p>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <button
          onClick={handleClick}
          className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
        >
          Get Started for Free
        </button>
        <span className="text-sm text-blue-100/70">
          No credit card required
        </span>
      </div>
    </div>
  );
}

export default CtaSection
