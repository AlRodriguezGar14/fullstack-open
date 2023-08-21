import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, upvoteAnecdote } from "./services/requests";

import { useNotifDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const upvoteAnecdoteMutation = useMutation(upvoteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const dispatchNotification = useNotifDispatch();

  const handleVote = (anecdote) => {
    upvoteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    dispatchNotification({
      type: "UPVOTE",
      payload: `Upvoted the anecdote... ${anecdote.content}`,
    });
    setTimeout(() => {
      dispatchNotification({ type: "CLEAN" });
    }, 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes);
  // console.log(result);

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
