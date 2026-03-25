import HeroMaster from "../components/hero-page-components/HeroMaster";
import HeroCard from "../components/hero-page-components/HeroCard";
import HeroPhoneSection from "../components/hero-page-components/HeroPhoneSection";

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
            title="Real time Analasysis"
            description="Watch your net worth update instantly as you sync accounts."
          />
        </div>

        {/* Card 2: Right side with more gap */}
        <div className="absolute left-[calc(50%+220px)] top-72">
          <HeroCard
            title="Smart Budgeting"
            description="AI-powered insights categorize and identify where to save."
          />
        </div>

        {/* Card 3: Left side, bottom side */}
        <div className="absolute right-[calc(50%+230px)] bottom-[47px]">
          <HeroCard title="Bank Grade security" description="" />
        </div>
      </div>
    </>
  );
};

export default HeroPage;