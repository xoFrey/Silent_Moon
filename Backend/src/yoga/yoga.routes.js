import express from "express";
import { YogaController } from "./yoga.controller.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";
import multer from "multer";

const upload = multer({ dest: "./uploads" });

export const yogaRoutes = express
  .Router()
  .get("/filterLevel/", YogaController.getYogasByLevelCtrl) // example fetch: api/v1/yoga/filterLevel/?levelSelection=Beginner
  .get("/filterCategory/", doJwtAuth, YogaController.getYogasByCategoryCtrl) // example fetch: api/v1/yoga/filterCategory/?categorySelection=Sleep
  .get("/getRandomYoga/", doJwtAuth, YogaController.getRandomYogaCtrl)
  .get("/detail/:yogaId", YogaController.getYogaDetailCtrl)
  .post("/", upload.single("fileUrl"), YogaController.createYogaCtrl)
  .patch("/:yogaId", upload.single("fileUrl"), YogaController.editYogaCtrl);
