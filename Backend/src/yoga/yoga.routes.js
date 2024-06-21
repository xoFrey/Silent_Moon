import express from "express";
import { YogaController } from "./yoga.controller.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const yogaRoutes = express
  .Router()
  .get("/filterLevel/", YogaController.getYogasByLevelCtrl) // example fetch: api/v1/yoga/filterLevel/?levelSelection=Beginner
  .get("/filterCategory/", doJwtAuth, YogaController.getYogasByCategoryCtrl) // example fetch: api/v1/yoga/filterCategory/?categorySelection=Sleep
  .get("/detail/:yogaId", YogaController.getYogaDetailCtrl)
  .post("/", YogaController.createYogaCtrl);
