import { registerUser } from "./user.services/user.register";

export const UserController = {
  registerUserCtrl,
  verifyUserCtrl,
  loginUserCtrl,
  refreshTokenCtrl,
  logoutUserCtrl,
  editUserCtrl,
};

async function registerUserCtrl(req, res) {
  try {
    const userInfo = req.body;
    log
    const result = await registerUser(userInfo);
    res.json({ result });
  } catch (err) {
    res
      .status(500)
      .json({ err, message: err.message || "Could not register user" });
  }
}
