import axios from "axios";

const registerFn = async (username, password) => {
  return await axios.post("http://localhost:3333/api/register", {
    username,
    password,
  });
};

export default registerFn;
