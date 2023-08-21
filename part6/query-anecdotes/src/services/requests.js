import axios from "axios";

const baseURl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseURl).then((res) => res.data);
