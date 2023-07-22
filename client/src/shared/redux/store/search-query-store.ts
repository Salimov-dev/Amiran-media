import { createSlice } from "@reduxjs/toolkit";

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState: {
    entities: null,
    isLoading: false,
  },
  reducers: {
    searchQueryReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: searchQueryReducer, actions } = searchQuerySlice;
const { searchQueryReceived } = actions;

export const setSearchQuery = (query) => async (dispatch) => {
  try {
    await dispatch(searchQueryReceived(query));
  } catch (error) {}
};

export const getSearchQuery = () => (state) => {
  return state.searchQuery.entities;
};

export default searchQueryReducer;
