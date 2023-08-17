import { useSelector, useDispatch } from "react-redux";
import { filterAction } from "../reducers/filterReducer";
// import { upvoteAction } from "../reducers/anecdoteReducer";
const FilterForm = () => {
  // const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const applyFilter = (e) => {
    // console.log(e.target.value);
    dispatch(filterAction(e.target.value));
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
