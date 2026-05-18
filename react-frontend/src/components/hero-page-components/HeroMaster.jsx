import { useNavigate } from "react-router";
import profile1 from '../../assets/images/icons/p1.png';
import profile2 from '../../assets/images/icons/p2.png';
import profile3 from '../../assets/images/icons/p3.png';


function HeroMaster() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById("hero-features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-14 text-center sm:px-8 md:pt-20">
      <div className="flex justify-center">
        <p className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
          trusted by over 100K+ users
        </p>
      </div>

      <div className="mt-8 max-w-4xl">
        <h1 className="text-left text-[34px] font-extrabold leading-[2.4rem] tracking-normal text-slate-950 sm:text-center md:text-6xl md:leading-tight lg:text-7xl">
          Master Your Money with{" "}
          <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            FinVue
          </span>
        </h1>
        <p className="mt-5 text-left text-[15px] leading-6 text-slate-500 sm:text-center md:mx-auto md:max-w-2xl md:text-lg">
          The all-in-one financial dashboard that simplifies budgeting, tracks goals,
          and optimizes your wealth. Start your journey to financial freedom today.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <button
          onClick={() => navigate("/signup")}
          className="h-13 w-full rounded-xl bg-blue-600 px-7 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-700 sm:w-auto md:h-15 md:text-lg"
        >
          Get Started
        </button>
        <button
          onClick={scrollToFeatures}
          className="h-13 w-full rounded-xl border border-slate-200 bg-white px-7 text-base font-bold text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto md:h-15 md:text-lg"
        >
          Watch Demo
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 md:hidden">
        <div className="flex">
          {[profile1, profile2, profile3].map((profile, index) => (
            <div
              key={profile}
              className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm first:ml-0 -ml-3"
              style={{ zIndex: 3 - index }}
            >
              <img className="h-full w-full object-cover" src={profile} alt="" />
            </div>
          ))}
        </div>

        <p className="text-left text-sm text-slate-500">
          Joined by <strong className="text-slate-900">10,000+</strong> users this month
        </p>
      </div>
    </section>
  );
}

export default HeroMaster;
