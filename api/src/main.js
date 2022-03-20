import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { databaseConnection } from "./db/index.js";
import { register, login, logout, refreshToken } from "./handlers/index.js";
import { authorization } from "./middleware/index.js";

const startServer = async () => {
  const app = express();
  dotenv.config();

  await databaseConnection.sync();

  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  // Auth routes
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/logout", authorization, logout);
  app.post("/api/refreshToken", authorization, refreshToken);

  // Protected routes
  app.get("/api/dummy", authorization, (req, res) => {
    return res.json({
      posts: [
        {
          id: 1,
          title: "Hello World",
        },
        {
          id: 2,
          title: "Hello World 2",
        },
      ],
    });
  });

  return app;
};

startServer()
  .then((app) => app.listen(process.env.PORT || 3333))
  .catch((err) => console.log(err));
