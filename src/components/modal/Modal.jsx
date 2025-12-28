import React, { useEffect, useState } from "react";
import DropdownButton from "../DropdownButton";
import "./modal.css";

const Modal = ({ isOpen, onClose, note, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    tag: "",
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        desc: note.desc || "",
        tag: note.tag || "",
      });
    }
  }, [note]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note?._id) return;

    await onSave(
      note._id,
      formData.title.trim(),
      formData.desc.trim(),
      formData.tag.trim()
    );

    onClose();
  };

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Update Note</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <DropdownButton
                  tag={formData.tag}
                  setTag={(tag) => setFormData((prev) => ({ ...prev, tag }))}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onClose}
              >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  !formData.title.trim() ||
                  !formData.desc.trim() ||
                  !formData.tag.trim()
                }
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
