import React, { useContext, useState } from "react";
import noteContext from "../../context/noteContext";
import DropdownButton from "../DropdownButton";
import AlertContext from "../../context/alertContext";

const Form = () => {
  const { addNote, getNote } = useContext(noteContext);
  const { showAlert } = useContext(AlertContext);
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });

  const handleChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.desc.trim() || !note.tag.trim()) return;

    await addNote(note.title.trim(), note.desc.trim(), note.tag.trim());
    setNote({ title: "", desc: "", tag: "" });
    getNote();
    showAlert("success", "Note added successfully.");
  };

  return (
    <form
      className="card-body shadow-sm border-0 p-4"
      style={{ maxWidth: "600px", margin: "2rem auto" }}
      onSubmit={handleSubmit}
    >
      <h4 className="mb-4 text-center text-secondary fw-semibold">
        Create Note
      </h4>

      <div className="mb-3">
        <label htmlFor="title" className="form-label text-secondary fw-medium">
          Title
        </label>
        <input
          autoFocus
          type="text"
          className="form-control form-control-lg"
          id="title"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Enter a clear title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="desc" className="form-label text-secondary fw-medium">
          Description
        </label>
        <textarea
          className="form-control"
          id="desc"
          name="desc"
          value={note.desc}
          onChange={handleChange}
          rows="4"
          placeholder="Write something meaningful..."
        />
      </div>

      <DropdownButton
        tag={note.tag}
        setTag={(tag) => setNote({ ...note, tag })}
      />

      <div className="d-flex justify-content-center my-3">
        <button
          type="submit"
          className="btn btn-info btn-lg"
          // disabled={!note.title || !note.desc || !note.tag}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
