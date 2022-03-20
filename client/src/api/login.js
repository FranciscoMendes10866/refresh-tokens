import axios from "axios";

const loginFn = async (username, password) => {
  return await axios.post("http://localhost:3333/api/login", {
    username,
    password,
  });
};

export default loginFn;
