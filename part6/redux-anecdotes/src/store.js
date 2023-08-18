import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./reducers/filterReducer";
import anecdoteSlice from "./reducers/anecdoteReducer";
import notificationSlice from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    anecdote: anecdoteSlice,
    notification: notificationSlice,
  },
});

export default store;
