import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesListReducer from "../../../entities/note/store/notes-store";
import usersListReducer from "./users-store";
import commentsListReducer from "./comments-store";
import categoriesListReducer from "./categories-store";

const rootReducer = combineReducers({
  notes: notesListReducer,
  users: usersListReducer,
  comments: commentsListReducer,
  categories: categoriesListReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
