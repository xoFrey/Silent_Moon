import { MeditationService } from "./meditation.services/meditation.index.js";

const createMeditationCtrl = async (req, res) => {
  try {
    const meditationInfo = {
      fileUrl: req.file ? req.file : null,
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      duration: req.body.duration,
      category: req.body.category,
    };
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
      meditationByLevel,
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
    const userId = req.authenticatedUserId;

    const result = await MeditationService.getMeditationsByCategory(
      meditationByCategory,
      userId,
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
const getRandomMeditationCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUserId;

    const result = await MeditationService.getRandomMeditation(userId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: err.message || "Could not get random meditation",
    });
  }
};

export const MeditationController = {
  getMeditationDetailCtrl,
  createMeditationCtrl,
  getMeditationsByLevelCtrl,
  getMeditationsByCategoryCtrl,
  getRandomMeditationCtrl,
};
