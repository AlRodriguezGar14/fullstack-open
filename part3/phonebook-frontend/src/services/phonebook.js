import axios from "axios";
// }
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  // const req = axios.put(`${baseUrl}/${id}`, newObject);
  // return req.then((res) => res.data);
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  console.log(`${baseUrl}/${id}`, newObject);

  return request.then((response) => {
    console.log("updated");
    return response.data;
  });
  // .catch((error) => {
  //   console.log(`${JSON.stringify(request)}`);
  //   console.log(`something went wrong: ${error}`);
  // });
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => {
      console.log("removed");
      return response.data;
    })
    .catch((error) => {
      console.log("fail");
    });
};

export default {
  getAll,
  create,
  update,
  remove,
};
