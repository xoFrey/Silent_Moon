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

const getYogaDetailCtrl = async (req, res) => {
  try {
    const yogaId = req.params.yogaId;
    const result = await YogaService.getYogaDetail(yogaId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get yoga-detail" });
  }
};

const getYogasByLevelCtrl = async (req, res) => {
  try {
    const yogaByLevel = req.query.levelSelection;

    const result = await YogaService.getYogasByLevel(yogaByLevel);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: err.message || "Could not get yogas by level",
    });
  }
};
const getYogasByCategoryCtrl = async (req, res) => {
  try {
    const yogaByCategory = req.query.categorySelection;
    const userId = req.authenticatedUserId;

    const result = await YogaService.getYogasByCategory(yogaByCategory, userId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: err.message || "Could not get yogas by category",
    });
  }
};

export const YogaController = {
  getYogaDetailCtrl,
  createYogaCtrl,
  getYogasByLevelCtrl,
  getYogasByCategoryCtrl,
  // addFavoriteCtrl,
  // removeFavoriteCtrl,
};
