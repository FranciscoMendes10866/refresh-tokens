import { RefreshTokens } from "../db/models/index.js";

export const logout = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "You must be logged in to logout.",
    });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const foundRefreshToken = await RefreshTokens.findOne({
      where: {
        token,
      },
    });

    if (!foundRefreshToken) {
      return res.status(401).json({
        error: "Invalid refresh token.",
      });
    }

    await foundRefreshToken.destroy();

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
