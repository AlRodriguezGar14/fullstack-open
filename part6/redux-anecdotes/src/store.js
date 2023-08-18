import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./reducers/filterReducer";
import anecdoteSlice from "./reducers/anecdoteReducer";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    anecdote: anecdoteSlice,
  },
});

export default store;
