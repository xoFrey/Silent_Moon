import { YogaService } from "./yoga.services/yoga.index.js";

const createYogaCtrl = async (req, res) => {
  try {
    const yogaInfo = req.body;

    const result = await YogaService.createYoga(yogaInfo);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not create yoga" });
  }
};

export const YogaController = {
  // getRecommendedCtrl,
  // getCategoriesCtrl,
  // getYogaDetailsCtrl,
  createYogaCtrl,
  // addFavoriteCtrl,
  // removeFavoriteCtrl,
};
