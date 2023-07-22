import { createSlice } from "@reduxjs/toolkit";

const selectedNoteSlice = createSlice({
  name: "selectedNote",
  initialState: {
    entities: null,
    isLoading: false,
  },
  reducers: {
    selectedNoteReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: selectedNoteReducer, actions } = selectedNoteSlice;
const { selectedNoteReceived } = actions;

export const setSelectedNoteList = (noteId) => async (dispatch) => {
  try {
    await dispatch(selectedNoteReceived(noteId));
    localStorage.setItem("selectedNoteId", noteId);
  } catch (error) {}
};

export const getSelectedNoteId = () => (state) => {
  const selectedNoteStorage = localStorage.getItem("selectedNoteId");
  if (selectedNoteStorage) {
    return selectedNoteStorage;
  } else {
    return state.selectedNote.entities;
  }
};

export default selectedNoteReducer;
