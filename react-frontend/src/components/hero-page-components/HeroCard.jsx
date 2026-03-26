import "../../assets/styles/HeroMaster.css";

function HeroCard({ icon, title, description }) {
  return (
    <div className="hero-card">
      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 p-1">
        <div className="w-8 h-8">
        <img src={icon} alt={icon} />
        </div>
      </div>
      <h2 className="hero-card-title font-bold">{title}</h2>
      <p className="hero-card-description">{description}</p>
    </div>
  );
}

export default HeroCard;
