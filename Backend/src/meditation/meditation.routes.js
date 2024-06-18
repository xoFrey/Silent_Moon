import express from "express";
import { MeditationController } from "./meditation.controller.js";

export const meditationRoutes = express
  .Router()
  .get("/filterLevel/", MeditationController.getMeditationsByLevelCtrl) // example fetch: api/v1/meditation/filterLevel/?levelSelection=Beginner
  .get("/filterCategory/", MeditationController.getMeditationsByCategoryCtrl) // example fetch: api/v1/meditation/filterCategory/?categorySelection=Kids
  .get("/detail/:meditationId", MeditationController.getMeditationDetailCtrl)
  .post("/", MeditationController.createMeditationCtrl);
// .patch("/", MeditationController.removeFavoriteCtrl);
