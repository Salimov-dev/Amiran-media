import { createAction, createSlice } from "@reduxjs/toolkit";
import noteService from "./note-service";
import { setSelectedNoteList } from "../../../shared/redux/store/selected-note-store";

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
    noteRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (note) => note._id !== action.payload
      );
    },
  },
});

const addNoteRequested = createAction("notes/addNoteRequested");
const removeNoteRequested = createAction("notes/removeNoteRequested");
const noteRequestFailed = createAction("notes/noteRequestFailed");

const { reducer: notesListReducer, actions } = notesListSlice;
const { notesRequested, noteCreated, notesReceived, notesFailed, noteRemoved } =
  actions;

export const loadNotesList = () => async (dispatch) => {
  dispatch(notesRequested());
  try {
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
    dispatch(setSelectedNoteList(content._id))
    dispatch(noteCreated(content));
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};

export const removeNote = (noteId) => async (dispatch) => {
  dispatch(removeNoteRequested());
  try {
    dispatch(noteRemoved(noteId));
    await noteService.remove(noteId);
  } catch (error) {
    dispatch(noteRequestFailed(error.message));
  }
};

export const getSelectedNote = (id) => (state) => {
  const selectedNote = state.notes.entities.find((note) => note._id === id);
  return selectedNote;
};

// export const getCreatedNoteId = () => (state) => {
//   return state.notes.entities[state.notes.entities.length - 1];
// };

export const getNotesList = () => (state) => state.notes.entities;

export default notesListReducer;
