import { User } from "../db/models/index.js";
import { hashPassword } from "../utils/index.js";

export const register = async (req, res) => {
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

    if (foundUser) {
      return res.status(409).json({
        error: "User already exists.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
