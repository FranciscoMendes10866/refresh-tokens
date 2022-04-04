import { User } from "./user.js";
import { RefreshTokens } from "./refreshTokens.js";

User.hasMany(RefreshTokens, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    as: "refreshTokens",
  },
});

RefreshTokens.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "userId",
    allowNull: false,
    as: "users",
  },
});

export { User, RefreshTokens };
