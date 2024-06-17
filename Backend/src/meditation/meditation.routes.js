import express from "express";
import { MeditationController } from "./meditation.controller.js";

export const meditationRoutes = express
  .Router()
  // .get("/", MeditationController.getRecommendedCtrl)
  // .get("/", MeditationController.getCategoriesCtrl)
  // .get("/", MeditationController.getMeditationDetailsCtrl)
  .post("/", MeditationController.createMeditationCtrl);
// .patch("/", MeditationController.addFavoriteCtrl)
// .patch("/", MeditationController.removeFavoriteCtrl);
