import HeroMaster from "../components/hero-page-components/HeroMaster";
import HeroCard from "../components/hero-page-components/HeroCard";
import HeroPhoneSection from "../components/hero-page-components/HeroPhoneSection";
import HeroHeader from "../components/hero-page-components/HeroHeader";

import CtaSection from "../components/hero-page-components/CtaSection";
import FeatureSection from "../components/hero-page-components/FeatureSection";
import HeroFooter from "../components/hero-page-components/HeroFooter";

import analitic from "../assets/images/icons/analytics-icon.svg";
import budget from "../assets/images/icons/budgets-icon.svg";
import optimize from "../assets/images/icons/optimization-icon.svg";
import star from "../assets/images/icons/stars.svg";
import up from "../assets/images/icons/up.svg";
import chart from "../assets/images/icons/charts.svg";

const HeroPage = () => {
  const stats = [
    {
      label: "ACTIVE USERS",
      value: "500K+",
      icon: up,
      alt: "Growth indicator",
    },
    {
      label: "ASSETS TRACKED",
      value: "$2B+",
      icon: chart,
      alt: "Assets chart",
    },
    {
      label: "CUSTOMER RATING",
      value: "4.9/5",
      icon: star,
      alt: "Customer rating",
    },
  ];

  return (
    <>
      <HeroHeader />

      <div className="bg-linear-to-b from-blue-50 via-slate-50 to-white">
        <HeroMaster />

        <div className="relative mx-auto mt-10 flex w-full max-w-6xl justify-center px-4 sm:mt-12 md:mt-16 md:px-6">
          <HeroPhoneSection />

          <div className="absolute right-[calc(50%+190px)] top-10 hidden lg:block xl:right-[calc(50%+230px)] xl:top-18">
            <HeroCard
              icon={analitic}
              title="Real-time Analysis"
              description="Watch your net worth update instantly as you sync accounts."
            />
          </div>

          <div className="absolute left-[calc(50%+188px)] top-58 hidden lg:block xl:left-[calc(50%+230px)] xl:top-72">
            <HeroCard
              icon={optimize}
              title="Smart Budgeting"
              description="AI-powered insights categorize and identify where to save."
            />
          </div>

          <div className="absolute bottom-8 right-[calc(50%+188px)] hidden lg:block xl:bottom-[47px] xl:right-[calc(50%+240px)]">
            <HeroCard
              icon={budget}
              title="Bank-grade Security"
              description="Keep sensitive data protected with privacy-first account controls."
            />
          </div>
        </div>

        <div className="my-7 flex w-full items-center justify-center lg:hidden">
          <p className="text-center text-[13px] font-bold leading-tight tracking-[0.24em] text-blue-600 sm:text-sm sm:tracking-[0.28em]">
            CORE <br /> BENEFITS
          </p>
        </div>
        <div className="my-7 flex w-full items-center justify-center lg:hidden">
          <p className="text-center text-[clamp(2.5rem,14vw,3.5rem)] font-extrabold leading-tight tracking-normal text-slate-950">
            Why <br />
            Choose <br />
            FinVue?
          </p>
        </div>
        <div className="flex items-center justify-center px-5 lg:hidden">
          <p className="max-w-sm text-center text-[18px] font-light leading-8 text-slate-500 sm:text-[20px]">
            Experience the future of personal finance with our comprehensive tools
            designed for the modern era.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-8 md:py-20">
          <div id="hero-features">
            <FeatureSection />
          </div>

          <div className="mt-10 flex flex-col items-center gap-5 md:hidden">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex w-full max-w-[400px] flex-col items-center rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5"
              >
                <span className="mb-2 text-xs font-bold tracking-[0.24em] text-slate-500">
                  {stat.label}
                </span>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-extrabold text-slate-950">
                    {stat.value}
                  </h2>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <img className="h-5 w-5 [filter:hue-rotate(170deg)_saturate(1.4)]" src={stat.icon} alt={stat.alt} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <CtaSection />
          </div>
        </div>
      </div>
      <HeroFooter />
    </>
  );
};

export default HeroPage;
