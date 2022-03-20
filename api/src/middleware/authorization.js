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

  try {
    const tokenData = verifyToken(token);

    delete tokenData.exp;

    req.user = tokenData.dataValues;

    return next();
  } catch (err) {
    return res.status(403).json({
      error: err.message,
    });
  }
};
