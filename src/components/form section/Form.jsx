import React from "react";

const Form = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h4 className="mb-4 text-center fw-semibold">Create Note</h4>

          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-medium">
              Title
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="title"
              placeholder="Enter a clear title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label fw-medium">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              placeholder="Write something meaningful..."
            ></textarea>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
