import express from "express";
import { YogaController } from "./yoga.controller.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const yogaRoutes = express
  .Router()
  .get("/filterLevel/", YogaController.getYogasByLevelCtrl)
  .get("/filterCategory/", doJwtAuth, YogaController.getYogasByCategoryCtrl)
  .get("/getRandomYoga/", doJwtAuth, YogaController.getRandomYogaCtrl)
  .get("/detail/:yogaId", YogaController.getYogaDetailCtrl)
  .post("/", upload.single("fileUrl"), YogaController.createYogaCtrl)
  .patch("/:yogaId", upload.single("fileUrl"), YogaController.editYogaCtrl);
