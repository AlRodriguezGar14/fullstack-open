import axios from "axios";
const host = "http://localhost:3003";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  return axios
    .get(`${host}${baseUrl}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${host}${baseUrl}`, newObject, config);
  console.log(response);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${host}${baseUrl}/${id}`, newObject);
  return response.data;
};

const removePost = async (id) => {
  const response = await axios.delete(`${host}${baseUrl}/${id}`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken, removePost };
