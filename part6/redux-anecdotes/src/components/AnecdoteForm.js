import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const newAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    dispatch(addAnecdote(anecdote));
    e.target.anecdote.value = "";
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
