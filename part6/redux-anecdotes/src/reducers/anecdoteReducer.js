const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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

const initialState = anecdotesAtStart.map(asObject);

export const upvoteAction = (id) => {
  return { type: "UPVOTE", payload: { id } };
};

export const addAnecdoteAction = (anecdote) => {
  return { type: "ADD", payload: { content: anecdote, votes: 0 } };
};

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "UPVOTE":
      const id = action.payload.id;
      const toUpvote = state.find((a) => a.id === id);
      const upvoted = { ...toUpvote, votes: toUpvote.votes + 1 };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : upvoted
      );
      return sortByVotes(updatedState);
    case "ADD":
      const anecdote = action.payload;
      anecdote.id = getId();
      return state.concat(anecdote);
    default:
      return state;
  }

  // return state;
};

export default reducer;

