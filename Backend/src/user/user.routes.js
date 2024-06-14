export const userRoutes = express
  .Router()
  .post("/register", UserController.registerUserCtrl)
  .post("/verify", UserController.verifyUserCtrl)
  .post("/login", UserController.loginUserCtrl)
  .post("/refresh-token", UserController.refreshTokenCtrl)
  .post("/logout", UserController.logoutUserCtrl)
  .patch("/", UserController.editUserCtrl);
