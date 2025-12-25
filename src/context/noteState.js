import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({ children }) => {
  const notesInitial = [
    {
      _id: "69499137a20514d4630ebf92",
      title: "My note 1",
      desc: "Something about this note 1",
      tag: "General",
      user: {
        _id: "6947f484b634362f7b2e22a7",
        name: "moiz",
        email: "moiz@gmail.com",
      },
      createdAt: "2025-12-22T18:43:03.844Z",
      updatedAt: "2025-12-22T18:43:03.844Z",
      __v: 0,
    },
    {
      _id: "694ac86af48c02fe0ae1ca36",
      title: "My note 2",
      desc: "Something about this note 2",
      tag: "Personal",
      user: {
        _id: "6947f484b634362f7b2e22a7",
        name: "moiz",
        email: "moiz@gmail.com",
      },
      createdAt: "2025-12-23T16:50:50.136Z",
      updatedAt: "2025-12-23T16:50:50.136Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
