import { UserService } from "./user.services/user.index.js";

export const UserController = {
  registerUserCtrl,
  verifyUserEmailCtrl,
  loginUserCtrl,
  //   refreshTokenCtrl,
  //   logoutUserCtrl,
  //   editUserCtrl,
};

async function registerUserCtrl(req, res) {
  try {
    const userInfo = req.body;

    const result = await UserService.registerUser(userInfo);
    res.json({ result });
  } catch (err) {
    res
      .status(500)
      .json({ err, message: err.message || "Could not register user" });
  }
}
async function loginUserCtrl(req, res) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await UserService.loginUser(userInfo);
    if (result.tokens.refreshToken) {
      req.session.refreshToken = result.tokens.refreshToken; // refresh token in http only cookie session speichern
    }
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not login user" });
  }
}

async function verifyUserEmailCtrl(req, res) {
  try {
    const verifyEmailInfo = {
      userId: req.body.userId,
      sixDigitCode: req.body.sixDigitCode,
    };
    const result = await UserService.verifyUserEmail(verifyEmailInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not verify email" });
  }
}
