import axios from "axios";
const host = "http://localhost:3003";
const baseUrl = "/api/blogs";

const getAll = () => {
  return axios
    .get(`${host}${baseUrl}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export default { getAll };
