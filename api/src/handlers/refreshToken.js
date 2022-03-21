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

  if (!foundRefreshToken) {
    try {
      const tokenData = verifyToken(token);

      await RefreshTokens.destroy({
        where: {
          userId: tokenData.dataValues.id,
        },
      });

      return res.status(403).json({
        error: "Invalid refresh token.",
      });
    } catch (err) {
      return res.sendStatus(403);
    }
  }

  try {
    await foundRefreshToken.destroy();

    const tokenData = verifyToken(token);

    delete tokenData.exp;

    const accessToken = signToken(
      { ...tokenData.dataValues },
      process.env.ACCESS_TOKEN_EXP
    );
    const refreshToken = signToken(
      { ...tokenData.dataValues },
      process.env.REFRESH_TOKEN_EXP
    );

    await RefreshTokens.create({
      token: refreshToken,
      userId: tokenData.dataValues.id,
    });

    return res.json({
      session: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
