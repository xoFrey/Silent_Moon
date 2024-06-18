import express from "express";
import { MeditationController } from "./meditation.controller.js";

export const meditationRoutes = express
  .Router()
  // .get("/", MeditationController.getRecommendedCtrl)
  // .get("/", MeditationController.getCategoriesCtrl)
  .get("/", MeditationController.getAllMeditationsCtrl)
  .get("/filter/", MeditationController.getMeditationsByLevelCtrl) // example fetch: api/v1/meditation/filter/?levelSelection=Beginner
  .get("/detail/:meditationId", MeditationController.getMeditationDetailCtrl)
  .post("/", MeditationController.createMeditationCtrl);
// .patch("/", MeditationController.removeFavoriteCtrl);
