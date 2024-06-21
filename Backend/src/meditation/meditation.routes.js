import express from "express";
import { MeditationController } from "./meditation.controller.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const meditationRoutes = express
  .Router()
  .get("/filterLevel/", MeditationController.getMeditationsByLevelCtrl) // example fetch: api/v1/meditation/filterLevel/?levelSelection=Beginner
  .get(
    "/filterCategory/",
    doJwtAuth,
    MeditationController.getMeditationsByCategoryCtrl,
  ) // example fetch: api/v1/meditation/filterCategory/?categorySelection=Kids
  .get("/detail/:meditationId", MeditationController.getMeditationDetailCtrl)
  .post("/", MeditationController.createMeditationCtrl);
