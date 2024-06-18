import { createMeditation } from "./meditation.createMeditation.js";
import { getMeditationDetail } from "./meditation.getMeditationDetail.js";
import { getMeditationsByCategory } from "./meditation.getMeditationsByCategory.js";
import { getMeditationsByLevel } from "./meditation.getMeditationsByLevel.js";

export const MeditationService = {
  createMeditation,
  getMeditationDetail,
  getMeditationsByLevel,
  getMeditationsByCategory,
};
