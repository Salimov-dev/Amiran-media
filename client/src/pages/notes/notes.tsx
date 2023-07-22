// libraries
import { useDispatch, useSelector } from "react-redux";
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
} from "../../entities/user/store/users-store";
import { getCommentsList } from "../../entities/comment/store/comments-store";
import { getCategoriesList } from "../../entities/categories/store/categories-store";
import {
  getSelectedNoteId,
  setSelectedNoteList,
} from "../../shared/redux/store/selected-note-store";

const Component = styled(Box)`
  display: flex;
  background-color: #f9f9f7;
`;

const Notes = () => {
  const selectedNoteID = useSelector(getSelectedNoteId());
  const selectedNote = useSelector(getSelectedNote(selectedNoteID));
  const noteAuthor = useSelector(getNoteAuthor(selectedNote?.userId));
  const notes = useSelector(getNotesList());
  const users = useSelector(getUsersList());
  const comments = useSelector(getCommentsList());
  const categories = useSelector(getCategoriesList());

  const dispatch = useDispatch();

  const handleSelectNote = (id: string) => {
    dispatch(setSelectedNoteList(id));
  };

  return (
    <Component>
      <NotesList
        notes={notes}
        onSelectNote={handleSelectNote}
        selectedNoteID={selectedNoteID}
      />
      <NoteContent
        note={selectedNote}
        author={noteAuthor}
        comments={comments}
      />
    </Component>
  );
};

export default Notes;
