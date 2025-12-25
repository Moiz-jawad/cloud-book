import React, { useContext } from "react";
import NoteContext from "../../context/noteContext";
import "./notes.css";

const Notes = () => {
  const context = useContext(NoteContext);

  if (!context) {
    return <p>Notes context not found!</p>;
  }

  const { notes } = context;

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="emoji">📝</div>
        <h5>No notes yet</h5>
        <p>Create your first note to get started</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card glass" key={note._id}>
          <div className="note-header">
            <h4>{note.title}</h4>
            <span className="tag">{note.tag}</span>
          </div>
          <p className="note-desc">{note.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
