export const filterAction = (filter) => {
  return { type: "FILTER-ON", payload: { filter } };
};

const filterReducer = (state = "", action) => {
  // console.log("filter now: ", state);
  console.log("filter action: ", action);

  switch (action.type) {
    case "FILTER-ON":
      console.log("filter now: ", action.payload.filter);
      return action.payload.filter;
    default:
      return "";
  }
};

export default filterReducer;
