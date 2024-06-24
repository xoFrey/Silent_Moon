import express from "express";
import { YogaController } from "./yoga.controller.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";
import multer from "multer";

export const yogaRoutes = express
  .Router()
  .get("/filterLevel/", YogaController.getYogasByLevelCtrl)
  .get("/filterCategory/", doJwtAuth, YogaController.getYogasByCategoryCtrl)
  .get("/getRandomYoga/", doJwtAuth, YogaController.getRandomYogaCtrl)
  .get("/detail/:yogaId", YogaController.getYogaDetailCtrl);

if (process.env.NODE_ENV === "development") {
  const upload = multer({ dest: "./uploads" });
  yogaRoutes
    .post("/", upload.single("fileUrl"), YogaController.createYogaCtrl)
    .patch("/:yogaId", upload.single("fileUrl"), YogaController.editYogaCtrl);
}
