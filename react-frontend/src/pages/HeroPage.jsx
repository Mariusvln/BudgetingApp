import HeroMaster from "../components/hero-page-components/HeroMaster";
import HeroCard from "../components/hero-page-components/HeroCard";
import HeroPhoneSection from "../components/hero-page-components/HeroPhoneSection";

import CtaSection from "../components/hero-page-components/CtaSection";
import FeatureCard from "../components/hero-page-components/FeatureCard";
import FeatureSection from "../components/hero-page-components/FeatureSection";

import analitic from "../assets/images/icons/analytics-icon.svg";
import budget from "../assets/images/icons/budgets-icon.svg";
import optimize from "../assets/images/icons/optimization-icon.svg";

const HeroPage = () => {
  return (
    <>
      {/* Main page */}
      <HeroMaster />

      <div className="relative mt-[64px] flex w-full justify-center">
        {/* The Center Piece (The Phone) */}
        <HeroPhoneSection />

        {/* Card 1: 50px Left from Phone */}
        <div className="absolute right-[calc(50%+223px)] top-18">
          <HeroCard
            icon={analitic}
            title="Real time Analasysis"
            description="Watch your net worth update instantly as you sync accounts."
          />
        </div>

        {/* Card 2: Right side with more gap */}
        <div className="absolute left-[calc(50%+220px)] top-72">
          <HeroCard
            icon={optimize}
            title="Smart Budgeting"
            description="AI-powered insights categorize and identify where to save."
          />
        </div>

        {/* Card 3: Left side, bottom side */}
        <div className="absolute right-[calc(50%+230px)] bottom-[47px]">
          <HeroCard icon={budget} title="Bank Grade security" description="" />
        </div>
      </div>

      <div className="m-20">
        <div className="">
          <FeatureSection />
        </div>
        <div>
          <CtaSection />
        </div>
      </div>
    </>
  );
};

export default HeroPage;
