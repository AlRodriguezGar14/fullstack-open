import { useSelector, useDispatch } from "react-redux";

import { upvoteAnecdotes } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  const notifyUpvote = (id) => {
    const anecdoteIs = anecdotes.find((anecdote) => anecdote.id === id);
    return {
      action: "Upvoted the anecdote ",
      content: anecdoteIs.content,
      display: true,
    };
  };

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(upvoteAnecdotes(anecdotes, id));
    const upvoteNotification = notifyUpvote(id);
    dispatch(displayNotification(upvoteNotification, 10));
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
