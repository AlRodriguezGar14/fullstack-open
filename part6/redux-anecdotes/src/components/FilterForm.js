import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const FilterForm = () => {
  // const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const applyFilter = (e) => {
    console.log("le filter", e.target.value);
    dispatch(filterAnecdotes(e.target.value));
  };
  return (
    <div>
      <form>
        Filter by text
        <input name="filter" type="text" onChange={applyFilter} />
      </form>
    </div>
  );
};

export default FilterForm;
