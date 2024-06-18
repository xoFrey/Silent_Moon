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

const getMeditationDetailCtrl = async (req, res) => {
  try {
    const meditationId = req.params.meditationId;
    const result = await MeditationService.getMeditationDetail(meditationId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get meditation-detail" });
  }
};
const getMeditationsByLevelCtrl = async (req, res) => {
  try {
    const meditationByLevel = req.query.levelSelection;

    const result = await MeditationService.getMeditationsByLevel(
      meditationByLevel
    );
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: err.message || "Could not get meditations by level",
    });
  }
};
const getMeditationsByCategoryCtrl = async (req, res) => {
  try {
    const meditationByCategory = req.query.categorySelection;

    const result = await MeditationService.getMeditationsByCategory(
      meditationByCategory
    );
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: err.message || "Could not get meditations by category",
    });
  }
};

export const MeditationController = {
  getMeditationDetailCtrl,

  createMeditationCtrl,
  getMeditationsByLevelCtrl,
  getMeditationsByCategoryCtrl,
  // addFavoriteCtrl,
  // removeFavoriteCtrl,
};
