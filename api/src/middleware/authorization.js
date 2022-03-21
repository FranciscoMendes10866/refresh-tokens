import { verifyToken } from "../utils/index.js";

export const authorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "Authorization header is required.",
    });
  }

  const isValid = authorization.startsWith("Bearer ");

  if (!isValid) {
    return res.status(401).json({
      error: "Invalid authorization header.",
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  let decodedToken;

  try {
    const tokenData = verifyToken(token);
    decodedToken = tokenData.user;
  } catch (err) {
    return res.status(403).json({
      error: err.message,
    });
  }

  req.user = decodedToken;

  return next();
};
