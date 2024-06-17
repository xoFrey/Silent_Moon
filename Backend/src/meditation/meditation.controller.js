import { MeditationService } from "./meditation.services/meditation.index.js";

const createMeditationCtrl = async (req, res) => {
  try {
    const meditationInfo = req.body;
    const result = await MeditationService.createMeditation(meditationInfo);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not create meditation" });
  }
};

const getAllMeditationsCtrl = async (req, res) => {
  try {
    const result = await MeditationService.getAllMeditations();

    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get all meditations" });
  }
};

export const MeditationController = {
  // getRecommendedCtrl,
  // getCategoriesCtrl,
  getAllMeditationsCtrl,
  createMeditationCtrl,
  // addFavoriteCtrl,
  // removeFavoriteCtrl,
};
