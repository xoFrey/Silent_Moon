import { addFavorite } from "./user.addFavorite.js";
import { editUser } from "./user.editUser.js";
import { loginUser } from "./user.login.js";
import { refreshToken } from "./user.refreshToken.js";
import { registerUser } from "./user.register.js";
import { verifyUserEmail } from "./user.verify.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUserEmail,
  editUser,
  addFavorite,
  refreshToken,
};
