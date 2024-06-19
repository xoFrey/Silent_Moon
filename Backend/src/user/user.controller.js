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
// timeout in dieser Funktion evtl. noch entfernen !!!
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
    const userInfo = req.body;

    const result = await UserService.editUser(userInfo);
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
      userId: req.body.userId,
      id: req.params.id,
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
      userId: req.body.userId,
      id: req.params.id,
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
