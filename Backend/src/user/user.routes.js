import express from "express";
import { UserController } from "./user.controller.js";

export const userRoutes = express
  .Router()
  .post("/register", UserController.registerUserCtrl)
  .post("/verify", UserController.verifyUserEmailCtrl)
  .post("/login", UserController.loginUserCtrl);
// .post("/refresh-token", UserController.refreshTokenCtrl)
// .post("/logout", UserController.logoutUserCtrl)
// .patch("/", UserController.editUserCtrl);
