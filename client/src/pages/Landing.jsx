import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
    return <div className="landing-page">
        {/* hero */}
        <section className="hero-section">
            <div className="hero-content">
                <h1>Secure Credential Manager</h1>
                <p className="tagline">Keep your Password safe and secure</p>
                <div className="land-btn">
                    <Link to="/register">
                        <Button variant="primary" size="large">Get Started</Button>
                    </Link>
                </div>
            </div>
        </section>
       
  </div>;
};

export default Landing;
