import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/requests";

const AnecdoteForm = () => {
  const newAnecdoteMutation = useMutation(createAnecdote);
  const queryClient = useQueryClient();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate(
      { content: content, votes: 0 },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("anecdotes");
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
