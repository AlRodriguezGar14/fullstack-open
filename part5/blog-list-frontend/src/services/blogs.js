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

const update = (id, newObject) => {
  const request = axios.put(`${host}${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken };
