import Sequelize from "sequelize";

import { databaseConnection } from "../index.js";

export const RefreshTokens = databaseConnection.define(
  "refreshTokens",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "refreshTokens",
  }
);
