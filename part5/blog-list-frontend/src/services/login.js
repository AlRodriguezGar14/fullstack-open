import axios from "axios";

const host = "http://localhost:3003";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(`${host}${baseUrl}`, credentials);
  return response.data;
};

export default { login };
