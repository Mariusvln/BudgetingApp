import phone1 from '../../assets/images/phone1.png'

function HeroPhoneSection() {
  return (
    <section className="relative z-10 rounded-[2rem] bg-linear-to-b from-white to-blue-50/70 p-3 shadow-2xl shadow-blue-950/15 ring-1 ring-blue-100">
      <img className="w-[280px] max-w-[76vw] drop-shadow-2xl md:w-[330px]" src={phone1} alt="FinVue mobile dashboard preview" />
    </section>
  );
}

export default HeroPhoneSection
