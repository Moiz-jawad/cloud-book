import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({ children }) => {
  const host = "http://localhost:7000/";

  const [notes, setNotes] = useState([]);

  // GET NOTES
  const getNote = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}api/v1/note/getNotes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const notesArray = Array.isArray(result?.data?.note)
        ? result.data.note
        : [];
      setNotes(notesArray);
    } catch (error) {
      console.error("Fetch notes error:", error);
      setNotes([]);
    }
  };

  // ADD NOTE
  const addNote = async (title, desc, tag) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}api/v1/note/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, desc, tag }),
      });

      const data = await response.json();

      if (data?.data) {
        setNotes((prevNotes) => [...prevNotes, data.data]);
      }
    } catch (error) {
      console.error("Add note error:", error);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}api/v1/note/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data?.data) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("delete note error:", error);
    }
  };

  // EDIT NOTE
  const editNote = async (id, title, desc, tag) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}api/v1/note/updateNote/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, desc, tag }),
      });

      const data = await response.json();

      if (data?.data) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, desc, tag } : note
          )
        );
      }
    } catch (error) {
      console.error("delete note error:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNote, addNote, editNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
