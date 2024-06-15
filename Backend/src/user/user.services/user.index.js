import { loginUser } from "./user.login.js";
import { registerUser } from "./user.register.js";
import { verifyUserEmail } from "./user.verify.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUserEmail,
};
