import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  },
});

const { reducer: notesListReducer, actions } = notesListSlice;
const { notesRequested, notesReceived, notesFailed } = actions;

export const loadNotesList = () => async (dispatch) => {
  dispatch(notesRequested());
  try {
    const { data } = await axios("http://localhost:8080/api/note");

    dispatch(notesReceived(data));
  } catch (error) {
    dispatch(notesFailed(error.message));
  }
};

export const getSelectedNote = (id) => (state) => {
  const selectedNote = state.notes.entities.find((note) => note._id === id);
  return selectedNote;
};

export const getNotesList = () => (state) => state.notes.entities;

export default notesListReducer;
