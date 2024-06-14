export const yogaRoutes = express
  .Router()
  .get("/", YogaController.getRecommendedCtrl)
  .get("/", YogaController.getCategoriesCtrl)
  .get("/", YogaController.getYogaDetailsCtrl)
  .post("/", YogaController.createYogaCtrl)
  .patch("/", YogaController.addFavoriteCtrl)
  .patch("/", YogaController.removeFavoriteCtrl);
