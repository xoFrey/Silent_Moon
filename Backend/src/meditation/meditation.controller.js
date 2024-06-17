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

export const MeditationController = {
  // getRecommendedCtrl,
  // getCategoriesCtrl,
  // getMeditationDetailsCtrl,
  createMeditationCtrl,
  // addFavoriteCtrl,
  // removeFavoriteCtrl,
};
