import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createAnecdote(anecdote));

    dispatch(
      displayNotification(
        { action: "New anecdote ", content: anecdote, display: true },
        5
      )
    );

    setTimeout(() => {
      dispatch(displayNotification({ display: false }));
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
