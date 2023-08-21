import axios from "axios";

const baseURl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseURl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
  axios.post(baseURl, newAnecdote).then((res) => res.data);
