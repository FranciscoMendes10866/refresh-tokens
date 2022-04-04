import { RefreshTokens } from "../db/models/index.js";
import { verifyToken, signToken } from "../utils/index.js";

export const refreshToken = async (req, res) => {
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

  const token = authorization.replace("Bearer", "").trim();

  const foundRefreshToken = await RefreshTokens.findOne({
    where: {
      token,
    },
  });

  let decodedFoundRefreshToken;

  if (!foundRefreshToken) {
    try {
      const tokenData = verifyToken(token);
      decodedFoundRefreshToken = tokenData.user;

      await RefreshTokens.destroy({
        where: {
          userId: decodedFoundRefreshToken.id,
        },
      });
    } catch (err) {
      return res.status(403).json({
        error: "Invalid token.",
      });
    }
  }

  let decodedToken;

  try {
    await foundRefreshToken.destroy();
    const tokenData = verifyToken(token);
    decodedToken = tokenData.user;
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  const accessToken = signToken(
    { user: decodedToken },
    process.env.ACCESS_TOKEN_EXP
  );

  const refreshToken = signToken(
    { user: decodedToken },
    process.env.REFRESH_TOKEN_EXP
  );

  await RefreshTokens.create({
    token: refreshToken,
    userId: decodedToken.id,
  });

  return res.json({
    session: {
      accessToken,
      refreshToken,
    },
  });
};
