import '../../assets/styles/HeroMaster.css';
import profile1 from '../../assets/images/icons/p1.png';
import profile2 from '../../assets/images/icons/p2.png';
import profile3 from '../../assets/images/icons/p3.png';


function HeroMaster() {
  return (
    <>
      <div className="hero-badge-container">
        <p className="hero-badge">trusted by over 100K+ users</p>
      </div>

      <div className="hero-header">
        <h1 className="hero-title">Master Your Money with</h1>
        <h1 className="hero-brand">FinVue</h1>
        <p class="hero-description">
  The all-in-one financial dashboard that simplifies budgeting, tracks goals,
  and optimizes your wealth. Start your journey to financial freedom today.
</p>
      </div>

      <div className="hero-buttons">
        <button className="btn-get-started">
          Get Started
        </button>
        <button className="btn-demo">
          Watch Demo
        </button>
    <div className="hero-users-container">
  <div className="hero-avatars-group">
    <div className="avatar-slot">
      <img src={profile1} alt="User 1" />
    </div>
    <div className="avatar-slot">
      <img src={profile2} alt="User 2" />
    </div>
    <div className="avatar-slot">
      <img src={profile3} alt="User 3" />
    </div>
  </div>

  <p className="hero-users-text">
    Joined by <strong>10,000+</strong> users this month
  </p>
</div>
      </div>
      <div className='core-benefits-banner'>
     
      </div>
    </>
  );
}

export default HeroMaster;
