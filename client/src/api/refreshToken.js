import axios from "axios";

const refreshTokenFn = async (refreshToken) => {
  return await axios.post(
    "http://localhost:3333/api/refreshToken",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

export default refreshTokenFn;
