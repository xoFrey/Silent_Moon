import express from "express";
import { YogaController } from "./yoga.controller.js";

export const yogaRoutes = express
  .Router()
  // .get("/", YogaController.getRecommendedCtrl)
  // .get("/", YogaController.getCategoriesCtrl)
  .get("/", YogaController.getAllYogasCtrl)
  .post("/", YogaController.createYogaCtrl);
// .patch("/", YogaController.addFavoriteCtrl)
// .patch("/", YogaController.removeFavoriteCtrl);
