import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

import { printNotification } from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

const notifyNewAnecdote = (anecdote) => {
  console.log("anecdote is ", anecdote);
  return {
    action: "New anecdote: ",
    content: anecdote,
    display: true,
  };
};

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(addAnecdote(newAnecdote));

    dispatch(printNotification(notifyNewAnecdote(anecdote)));

    setTimeout(() => {
      dispatch(printNotification({ display: false }));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
