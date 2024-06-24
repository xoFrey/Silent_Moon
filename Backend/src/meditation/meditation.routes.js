import express from "express";
import { MeditationController } from "./meditation.controller.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";
import multer from "multer";

export const meditationRoutes = express
  .Router()
  .get("/filterLevel/", MeditationController.getMeditationsByLevelCtrl)
  .get(
    "/filterCategory/",
    doJwtAuth,
    MeditationController.getMeditationsByCategoryCtrl,
  )
  .get(
    "/getRandomMeditation/",
    doJwtAuth,
    MeditationController.getRandomMeditationCtrl,
  )
  .get("/detail/:meditationId", MeditationController.getMeditationDetailCtrl);

if (process.env.NODE_ENV === "development") {
  const upload = multer({ dest: "./uploads" });
  meditationRoutes.post(
    "/",
    upload.single("fileUrl"),
    MeditationController.createMeditationCtrl,
  );
}
