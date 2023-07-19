import { createSlice } from "@reduxjs/toolkit";

const usersListSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    isLoading: false,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersFailed: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: usersListReducer, actions } = usersListSlice;
const { usersRequested, usersReceived, usersFailed } = actions;

export const loadUsersList = (data) => async (dispatch) => {
  dispatch(usersRequested());
  try {
    dispatch(usersReceived(data));
  } catch (error) {
    dispatch(usersFailed(error.message));
  }
};

export const getNoteAuthor = (id) => (state) =>
  state.users.entities.find((user) => user._id === id);

export const getUsersList = () => (state) => state.users.entities;

export default usersListReducer;
