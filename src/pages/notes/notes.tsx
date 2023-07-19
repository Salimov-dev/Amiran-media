// libraries
import { useSelector } from "react-redux";
import { useState } from "react";
// MUI
import { Box } from "@mui/material";
import styled from "@emotion/styled";
// components
import NoteContent from "../../entities/note/components/note-content";
import NotesList from "../../entities/note/components/notes-list";
// store
import {
  getNotesList,
  getSelectedNote,
} from "../../entities/note/store/notes-store";
import {
  getNoteAuthor,
  getUsersList,
} from "../../shared/redux/store/users-store";
import { getCommentsList } from "../../shared/redux/store/comments-store";
import { getCategoriesList } from "../../shared/redux/store/categories-store";

const Component = styled(Box)`
  display: flex;
  background-color: #f9f9f7;
`;

const Notes = () => {
  const [selectedNoteID, setSelectedNoteID] = useState(null);
  const selectedNote = useSelector(getSelectedNote(selectedNoteID));
  const noteAuthor = useSelector(getNoteAuthor(selectedNote?.userID));
  const notes = useSelector(getNotesList());
  const users = useSelector(getUsersList());
  const comments = useSelector(getCommentsList());
  const categories = useSelector(getCategoriesList());

  const handleSelectNote = (id: string) => {
    setSelectedNoteID(id);
  };

  return (
    <Component>
      <NotesList notes={notes} onSelectNote={handleSelectNote} />
      <NoteContent note={selectedNote} author={noteAuthor} />
    </Component>
  );
};

export default Notes;
