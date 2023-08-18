import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <FilterForm />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
