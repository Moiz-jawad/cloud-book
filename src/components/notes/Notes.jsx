import React, { useContext, useEffect, useState } from "react";
import "./notes.css";
import noteContext from "../../context/noteContext";
import Modal from "../modal/Modal"; // adjust path if needed
import AlertContext from "../../context/alertContext";

const Notes = () => {
  const { notes = [], getNote, editNote, deleteNote } = useContext(noteContext);
  const { showAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async (id, title, desc, tag) => {
    await editNote(id, title, desc, tag);
    await getNote();
    showAlert("success", "Note updated.");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (getNote) await getNote();
      setLoading(false);
    };
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="empty-state">
        <div className="emoji">⏳</div>
        <h4>Loading notes...</h4>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="emoji">📝</div>
        <h4 className="fw-bold text-secondary">No notes yet</h4>
        <p>Create your first note to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        note={selectedNote}
        onSave={handleSave}
      />

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-card glass" key={note._id}>
            <div className="note-header">
              <h4>{note.title}</h4>
              <span className="tag">{note.tag}</span>
            </div>

            <p className="note-desc">{note.desc}</p>

            <div className="container d-flex justify-content-between">
              <button
                className="btn btn-outline-success"
                onClick={() => openModal(note)}
              >
                <i className="fa-solid fa-edit"></i>
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={async () => {
                  await deleteNote(note._id);
                  showAlert("warning", "Note deleted.");
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
