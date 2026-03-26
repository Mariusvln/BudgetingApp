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
    </>
  );
};

export default HeroPage;