import axios from "axios";
import { useSelector } from "react-redux";

const baseurl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseurl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content: content, votes: 0 };
  const response = await axios.post(baseurl, object);
  return response.data;
};

const upvote = async (anecdotes, id) => {
  // const anecdotesUpdated = anecdotes.map((anecdote) => {
  //   return anecdote.id === id
  //     ? { ...anecdote, votes: anecdote.votes + 1 }
  //     : anecdote;
  // });
  const upvotedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
  const response = await axios.put(`${baseurl}/${id}`, {
    ...upvotedAnecdote,
    votes: upvotedAnecdote.votes + 1,
  });
  return response.data;
};

export default { getAll, createNew, upvote };
