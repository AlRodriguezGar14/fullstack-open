import { createSlice } from "@reduxjs/toolkit";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

const sortByVotes = (anecdotes) => {
  for (let i = 1; i < anecdotes.length; i++) {
    let isSwapped = false;
    for (let j = 1; j < anecdotes.length; j++) {
      if (anecdotes[j].votes > anecdotes[j - 1].votes) {
        const lower = anecdotes[j - 1];
        const higher = anecdotes[j];
        anecdotes[j - 1] = higher;
        anecdotes[j] = lower;
        isSwapped = true;
      }
    }
    if (!isSwapped) break;
  }
  return anecdotes;
};

// const initialState = anecdotesAtStart.map((anecdote) => asObject(anecdote));

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    upvoteAnecdote(state, action) {
      const id = action.payload;
      const toUpvote = state.find((a) => a.id === id);
      const upvoted = { ...toUpvote, votes: toUpvote.votes + 1 };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : upvoted
      );
      return sortByVotes(updatedState);
    },
    addAnecdote(state, action) {
      // const anecdote = asObject(action.payload);
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { upvoteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
