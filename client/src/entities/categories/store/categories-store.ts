import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categoriesListSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [],
    isLoading: false,
  },
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoriesFailed: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoriesListReducer, actions } = categoriesListSlice;
const { categoriesRequested, categoriesReceived, categoriesFailed } = actions;

export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const { data } = await axios("http://localhost:8080/api/category");
    dispatch(categoriesReceived(data));
  } catch (error) {
    dispatch(categoriesFailed(error.message));
  }
};

export const getCategoriesList = () => (state) => state.categories.entities;


export default categoriesListReducer;
