import { UserService } from "./user.services/user.index.js";

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
      req.session.refreshToken = result.tokens.refreshToken;
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

const refreshTokenCtrl = async (req, res) => {
  try {
    const result = await UserService.refreshToken(req.authenticatedUserId);
    setTimeout(() => {
      res.json({ result });
    }, 700);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not refresh access token" });
  }
};

const editUserCtrl = async (req, res) => {
  try {
    const updateInfo = {
      userId: req.body.userId,
      username: req.body.username,
      alertWeekdays: req.body.alertWeekdays,
      alertTime: req.body.alertTime,
      userLevel: req.body.userLevel,
      fileUrl: req.file ? req.file : null,
    };

    const result = await UserService.editUser(updateInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not edit user" });
  }
};

const addFavoriteCtrl = async (req, res) => {
  try {
    const updateInfo = {
      id: req.params.id,
      userId: req.body.userId,
    };
    const result = await UserService.addFavorite(updateInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add Favorite" });
  }
};

const removeFavoriteCtrl = async (req, res) => {
  try {
    const updateInfo = {
      id: req.params.id,
      userId: req.body.userId,
    };
    const result = await UserService.removeFavorite(updateInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add Favorite" });
  }
};

async function logoutUserCtrl(req, res) {
  req.session.refreshToken = null;
  res.status(200).json({ result: { message: "You are now logged out" } });
}

export const UserController = {
  registerUserCtrl,
  verifyUserEmailCtrl,
  loginUserCtrl,
  refreshTokenCtrl,
  logoutUserCtrl,
  editUserCtrl,
  addFavoriteCtrl,
  removeFavoriteCtrl,
};
