import HeroMaster from "../components/hero-page-components/HeroMaster";
import HeroCard from "../components/hero-page-components/HeroCard";
import HeroPhoneSection from "../components/hero-page-components/HeroPhoneSection";

import CtaSection from "../components/hero-page-components/CtaSection";
import FeatureCard from "../components/hero-page-components/FeatureCard";
import FeatureSection from "../components/hero-page-components/FeatureSection";

import analitic from "../assets/images/icons/analytics-icon.svg";
import budget from "../assets/images/icons/budgets-icon.svg";
import optimize from "../assets/images/icons/optimization-icon.svg";
import star from "../assets/images/icons/stars.svg";
import up from "../assets/images/icons/up.svg";
import chart from "../assets/images/icons/charts.svg";

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
  <div className="core-benefits-baner flex justify-center items-center w-full my-8 block md:hidden">
  <p className="core-benefits text-center text-[#64e764] font-bold tracking-widest text-[15px] sm:text-sm leading-tight">
    CORE <br /> BENEFITS
  </p>
</div>
<div className="Why-choose-container flex justify-center items-center w-full my-8 block md:hidden">
  <p className="why-choose-text text-center text-black font-bold  text-[50px] leading-tight tracking-tight">Why <br />Choose <br />FinVue?</p>
</div>
<div className="description-container  flex justify-center items-center block md:hidden">
  <p className="experience-description text-center  text-[#808080] font-light text-[20px]">Experience the future of <br />personal finance with our <br />comprhesive tools designed <br />for the modern era.</p>
</div>

<div className="active-users "></div>
      <div className="m-20">
        <div className="">
          <FeatureSection />
        </div>
        <br />
        <div className="active-users flex flex-col items-center gap-6 px-6 md:hidden ">
 
  <div className="w-full max-w-[400px] bg-[#f0f9f4] rounded-2xl p-6 flex flex-col items-center border border-[#e0ece6]">
    <span className="text-[#7a8b94] text-xs font-bold tracking-widest mb-2">ACTIVE USERS</span>
    <div className="flex items-center gap-2">
      <h2 className="text-[#1a2b3b] text-4xl font-extrabold ">500K+</h2>
      <span className="text-[#22c55e] text-2xl"><img src={up} alt="Arrow Up" /></span>
    </div>
  </div>


  <div className="w-full max-w-[400px] bg-[#f0f9f4] rounded-2xl p-8 flex flex-col items-center border border-[#e0ece6]">
    <span className="text-[#7a8b94] text-xs font-bold tracking-widest mb-2">ASSETS TRACKED</span>
    <div className="flex items-center gap-2">
      <h2 className="text-[#1a2b3b] text-4xl font-extrabold ">$2B+</h2>
<span className="text-[#22c55e] text-2xl"><img src={chart} alt="Chart" /></span>
    </div>
  </div>

  
  <div className="w-full max-w-[400px] bg-[#f0f9f4] rounded-2xl p-8 flex flex-col items-center border border-[#e0ece6]">
    <span className="text-[#7a8b94] text-xs font-bold tracking-widest mb-2">CUSTOMER RATING</span>
    <div className="flex items-center gap-2">
      <h2 className="text-[#1a2b3b] text-4xl font-extrabold">4.9/5</h2>
      <span className="text-[#22c55e] text-2xl"><span className="text-[#22c55e] text-2xl"><img src={star} alt="Star" /></span></span>
    </div>
  </div>
</div>

<div className="m-20"></div>
        <div>
          <CtaSection />
        </div>
      </div>
   
    </>
  );
};

export default HeroPage;
