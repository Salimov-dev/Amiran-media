// libraries
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Box } from "@mui/material";
import styled from "@emotion/styled";
// components
import NoteContent from "../../entities/note/note-content/note-content";
import NotesList from "../../entities/note/note-list/notes-list";
// store
import {
  getNotesList,
  getSelectedNote,
} from "../../entities/note/store/notes-store";
import { getNoteAuthor } from "../../entities/user/store/users-store";
import { getCommentsList } from "../../entities/comment/store/comments-store";
import {
  getSelectedNoteId,
  setSelectedNote,
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
  const comments = useSelector(getCommentsList());

  const dispatch = useDispatch();

  const handleSelectNote = (id: string) => {
    dispatch(setSelectedNote(id));
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
