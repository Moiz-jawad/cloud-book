import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper min-vh-100 py-5">
      <div className="container fade-in" style={{ maxWidth: "900px" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge about-badge mb-3">About This App</span>
          <h1 className="fw-bold display-5 mt-3">
            Simple Notes, Built Thoughtfully
          </h1>
          <p className="text-muted fs-5 mt-3">
            A clean, distraction-free space to capture ideas and stay organized.
          </p>
        </div>

        {/* Content Card */}
        <div className="card glass-card shadow-lg hover-lift">
          <div className="card-body p-4 p-md-5">
            <p className="fs-5 text-muted mb-4">
              This notes app is designed with a focus on simplicity, clarity,
              and performance. Every interaction is intentional, so you can
              focus on writing instead of managing clutter.
            </p>

            <p className="fs-5 text-muted mb-4">
              The interface uses modern design principles like glassmorphism,
              smooth micro-animations, and responsive layouts to deliver a
              pleasant and intuitive experience across devices.
            </p>

            <p className="fs-5 text-muted mb-0">
              Whether you are jotting down quick thoughts or organizing longer
              notes, this app keeps everything accessible and easy to use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
