import express from "express";
import { MeditationController } from "./meditation.controller.js";

export const meditationRoutes = express
  .Router()
  // .get("/", MeditationController.getRecommendedCtrl)
  // .get("/", MeditationController.getCategoriesCtrl)
  .get("/", MeditationController.getAllMeditationsCtrl)
  .post("/", MeditationController.createMeditationCtrl);
// .patch("/", MeditationController.removeFavoriteCtrl);
