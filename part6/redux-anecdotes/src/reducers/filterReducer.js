import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      console.log("filter now: ", action.payload);
      return action.payload;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
