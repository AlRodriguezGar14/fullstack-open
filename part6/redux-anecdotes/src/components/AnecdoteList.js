import { useSelector, useDispatch } from "react-redux";

import { upvoteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  // const anecdotes = [
  //   { content: "aaa", id: 1, votes: 0 },
  //   { content: "bbbb", id: 2, votes: 1 },
  // ];

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(upvoteAnecdote(id));
  };

  let filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
