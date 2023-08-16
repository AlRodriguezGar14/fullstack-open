import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const upvote = (id) => {
    return { type: "UPVOTE", payload: { id } };
  };
  const vote = (id) => {
    console.log("vote", id);
    dispatch(upvote(id));
  };

  const addAnecdote = (anecdote) => {
    return { type: "ADD", payload: { content: anecdote, votes: 0 } };
  };
  const newAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    dispatch(addAnecdote(anecdote));
    e.target.anecdote.value = "";
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;

