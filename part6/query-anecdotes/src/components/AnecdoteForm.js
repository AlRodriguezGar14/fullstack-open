import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/requests";
import { useNotifDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const dispatchNotification = useNotifDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content: content, votes: 0 });

    dispatchNotification({
      type: "POST",
      payload: `New anecdote published: ${content}`,
    });
    setTimeout(() => {
      dispatchNotification({ type: "CLEAN" });
    }, 5000);
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
