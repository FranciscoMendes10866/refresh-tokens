import { User, RefreshTokens } from "../db/models/index.js";
import { verifyPassword, signToken } from "../utils/index.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required.",
      });
    }

    const foundUser = await User.findOne({
      where: {
        username,
      },
    });

    if (!foundUser) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const isPasswordValid = await verifyPassword(foundUser.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password.",
      });
    }

    const accessToken = signToken(
      { ...foundUser },
      process.env.ACCESS_TOKEN_EXP
    );
    const refreshToken = signToken(
      { ...foundUser },
      process.env.REFRESH_TOKEN_EXP
    );

    await RefreshTokens.create({
      token: refreshToken,
      userId: foundUser.id,
    });

    return res.json({
      session: {
        accessToken,
        refreshToken,
      },
      user: foundUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
