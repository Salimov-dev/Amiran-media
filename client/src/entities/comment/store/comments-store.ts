import axios from "axios";
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

export const loadCommentsList = () => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { data } = await axios("http://localhost:8080/api/comment");
    dispatch(commentsReceived(data));
  } catch (error) {
    dispatch(commentsFailed(error.message));
  }
};

export const getCommentsList = () => (state) => state.comments.entities;


export default commentsListReducer;
