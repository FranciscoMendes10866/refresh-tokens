import axios from "axios";

const logoutFn = async (refreshToken) => {
  return await axios.post(
    "http://localhost:3333/api/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

export default logoutFn;
