import Form from "../form section/Form";
import "./Home.css";
import Notes from "../notes/Notes";

const Home = () => {
  return (
    <div className="home-wrapper min-vh-100 py-5">
      <div className="container fade-in" style={{ maxWidth: "900px" }}>
        {/* Hero */}
        <div className="text-center mb-5">
          <span className="badge hero-badge mb-3">Smart Notes</span>
          <h1 className="fw-bold display-5 mt-3">Organize Your Thoughts</h1>
          <p className="text-muted fs-5 mt-2">
            Write fast. Think clearly. Stay focused.
          </p>
        </div>

        {/* Add Note */}
        <div className="card glass-card shadow-lg mb-5 hover-lift">
          <div className="card-body p-4 p-md-5">
            <h4 className="fw-semibold mb-4">Add a New Note</h4>
            <Form />
          </div>
        </div>

        {/* Notes */}
        <div className="card glass-card shadow-sm hover-lift ">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-semibold mb-0">Your Notes</h4>
            </div>
            <Notes />
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="floating-btn shadow-lg" title="Add Note">
        +
      </button>
    </div>
  );
};

export default Home;
