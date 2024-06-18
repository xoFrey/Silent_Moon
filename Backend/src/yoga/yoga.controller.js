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

const getAllYogasCtrl = async (req, res) => {
  try {
    const result = await YogaService.getAllYogas();

    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get all yogas" });
  }
};
const getYogaDetailCtrl = async (req, res) => {
  try {
    const yogaId = req.params.yogaId;
    const result = await YogaService.getYogaDetail(yogaId);
    res.json({ result });
  } catch (err) {
    console
      .log(err)
      .status(500)
      .json({ err, message: err.message || "Could not get yoga-detail" });
  }
};

export const YogaController = {
  // getRecommendedCtrl,
  getYogaDetailCtrl,
  getAllYogasCtrl,
  createYogaCtrl,
  // addFavoriteCtrl,
  // removeFavoriteCtrl,
};
