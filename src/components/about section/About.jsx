import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper min-vh-100 py-5">
      <div className="container fade-in" style={{ maxWidth: "960px" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge about-badge mb-3">
            No‑nonsense note system
          </span>
          <h1 className="fw-bold display-4 mt-2 text-uppercase">
            Stop Losing Powerful Ideas
          </h1>
          <p className="text-muted fs-5 mt-3">
            CloudBook is built to be fast, sharp and unapologetically focused on
            execution  not aesthetics.
          </p>
        </div>

        {/* Aggressive value props */}
        <div className="card glass-card shadow-lg hover-lift mb-4">
          <div className="card-body p-4 p-md-5">
            <div className="row g-4">
              <div className="col-md-4">
                <h5 className="fw-semibold text-secondary mb-2">
                  Brutal speed
                </h5>
                <p className="text-muted mb-0">
                  Open the app, slam down your thoughts, move on. No loading
                  screens, no friction, no fluff.
                </p>
              </div>

              <div className="col-md-4">
                <h5 className="fw-semibold text-secondary mb-2">Laser focus</h5>
                <p className="text-muted mb-0">
                  A clean, aggressive layout that keeps your attention on the
                  work, not on UI gimmicks or busy dashboards.
                </p>
              </div>

              <div className="col-md-4">
                <h5 className="fw-semibold text-secondary mb-2">
                  Always ready
                </h5>
                <p className="text-muted mb-0">
                  From quick brain dumps to deep project notes, CloudBook stays
                  lean and ready to handle it without slowing you down.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Aggressive promise */}
        <div className="card glass-card shadow-sm hover-lift">
          <div className="card-body p-4 p-md-5">
            <h5 className="fw-semibold text-secondary mb-3">
              What this app does for you:
            </h5>
            <ul className="mb-0 text-muted">
              <li className="mb-2">
                <span className="fw-semibold">Kills chaos</span>  dump all your
                ideas, tasks and drafts into one relentless inbox.
              </li>
              <li className="mb-2">
                <span className="fw-semibold">Keeps you accountable</span>  your
                notes are structured, searchable and always in front of you.
              </li>
              <li className="mb-0">
                <span className="fw-semibold ">Scales with your grind</span> 
                from a handful of notes to thousands, without turning into a
                mess.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
