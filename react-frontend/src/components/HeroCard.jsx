import '../styles/HeroMaster.css';

function HeroCard({ title, description }) {
    return (
        <div className="hero-card">
            <h2 className="hero-card-title">{title}</h2>
            <p className="hero-card-description">{description}</p>
        </div>
    );
}

export default HeroCard;
