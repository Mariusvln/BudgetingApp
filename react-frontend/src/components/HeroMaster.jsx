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
      </div>

      <div className="hero-buttons">
        <button className="btn-get-started">
          Get Started
        </button>
        <button className="btn-demo">
          Watch Demo
        </button>
      </div>
    </>
  );
}

export default HeroMaster;
