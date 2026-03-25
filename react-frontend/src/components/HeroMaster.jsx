import React from 'react';
import '../styles/HeroMaster.css';

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
        <div class="hero-users">
  <div class="hero-avatars">
    <span class="avatar"></span>
    <span class="avatar"></span>
    <span class="avatar"></span>
  </div>

  <p class="hero-users-text">
    Joined by <strong>10,000+</strong> users this month
  </p>
</div>
      </div>
    </>
  );
}

export default HeroMaster;
