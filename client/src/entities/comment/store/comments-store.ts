import axios from "axios";
import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "./comment-service";

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
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (comm) => comm._id !== action.payload
      );
    },
  },
});

const { reducer: commentsListReducer, actions } = commentsListSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsFailed,
  commentCreated,
  commentRemoved,
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList = () => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { data } = await axios("http://localhost:8080/api/comment");
    dispatch(commentsReceived(data));
  } catch (error) {
    dispatch(commentsFailed(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(addCommentRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsFailed(error.message));
  }
};

// export const removeComment = (commentId) => async (dispatch) => {
//   dispatch(removeCommentRequested());
//   try {
//     const { content } = await commentService.removeComment(commentId);
//     if (!content) {
//       dispatch(commentRemoved(commentId));
//     }
//   } catch (error) {
//     dispatch(commentsRequestFiled(error.message));
//   }
// };

export const getCommentsList = () => (state) => state.comments.entities;

export default commentsListReducer;
