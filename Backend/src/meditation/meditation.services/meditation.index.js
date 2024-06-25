import { createMeditation } from "./meditation.createMeditation.js";
import { editMeditation } from "./meditation.editMeditation.js";
import { getMeditationDetail } from "./meditation.getMeditationDetail.js";
import { getMeditationsByCategory } from "./meditation.getMeditationsByCategory.js";
import { getMeditationsByLevel } from "./meditation.getMeditationsByLevel.js";
import { getRandomMeditation } from "./meditation.getRandomMeditation.js";

export const MeditationService = {
  createMeditation,
  getMeditationDetail,
  getMeditationsByLevel,
  getMeditationsByCategory,
  getRandomMeditation,
  editMeditation,
};
