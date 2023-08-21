import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAnecdotes } from "./services/requests";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery("anecdotes", getAnecdotes);
  console.log(result);

  if (result.isLoading) {
    return <p>Loading your anecdotes...</p>;
  }
  if (result.isError) {
    return <p>Ops! Something went wrong!</p>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
