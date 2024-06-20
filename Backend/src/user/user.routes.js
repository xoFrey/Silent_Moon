import express from "express";
import { UserController } from "./user.controller.js";
import {
  doJwtAuth,
  validateRefreshTokenInCookieSession,
} from "../middlewares/doJwtAuth.js";

export const userRoutes = express
  .Router()
  .post("/register", UserController.registerUserCtrl)
  .post("/verify", UserController.verifyUserEmailCtrl)
  .post("/login", UserController.loginUserCtrl)
  .post(
    "/refresh-token",
    validateRefreshTokenInCookieSession,
    UserController.refreshTokenCtrl,
  )
  .patch("/:id/like", UserController.addFavoriteCtrl)
  .patch("/:id/unlike", UserController.removeFavoriteCtrl)
  .post("/logout", UserController.logoutUserCtrl)
  .patch("/", UserController.editUserCtrl);
