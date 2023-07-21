import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import noteService from "./note-service";

const notesListSlice = createSlice({
  name: "notes",
  initialState: {
    entities: [],
    isLoading: false,
  },
  reducers: {
    notesRequested: (state) => {
      state.isLoading = true;
    },
    notesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    notesFailed: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    noteCreated: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

const addNoteRequested = createAction("notes/addNoteRequested");
const noteRequestFailed = createAction("notes/noteRequestFailed");

const { reducer: notesListReducer, actions } = notesListSlice;
const { notesRequested, notesReceived, notesFailed } = actions;

export const loadNotesList = () => async (dispatch) => {
  dispatch(notesRequested());
  try {
    // const { data } = await axios("http://localhost:8080/api/note");
    // dispatch(notesReceived(data));
    const { content } = await noteService.get();
    dispatch(notesReceived(content));
  } catch (error) {
    dispatch(notesFailed(error.message));
  }
};

export const createNote = (payload) => async (dispatch) => {
  dispatch(addNoteRequested());

  try {
    const { content } = await noteService.create(payload);

    dispatch(noteCreated(content));
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};

// export const removeComment = (commentId) => async (dispatch) => {
//   dispatch(removeCommentRequested());
//   try {
//       const { content } = await commentService.removeComment(commentId);
//       if (!content) {
//           dispatch(commentRemoved(commentId));
//       }
//   } catch (error) {
//       dispatch(commentsRequestFiled(error.message));
//   }
// };

export const getSelectedNote = (id) => (state) => {
  const selectedNote = state.notes.entities.find((note) => note._id === id);
  return selectedNote;
};

export const getNotesList = () => (state) => state.notes.entities;

export default notesListReducer;
