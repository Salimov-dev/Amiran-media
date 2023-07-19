import { createSlice } from "@reduxjs/toolkit";

const commentsListSlice = createSlice({
  name: "comments",
  initialState: {
    entities: [],
    isLoading: false,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsFailed: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: commentsListReducer, actions } = commentsListSlice;
const { commentsRequested, commentsReceived, commentsFailed } = actions;

export const loadCommentsList = (data) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    dispatch(commentsReceived(data));
  } catch (error) {
    dispatch(commentsFailed(error.message));
  }
};

export const getCommentsList = () => (state) => state.comments.entities;

export default commentsListReducer;
