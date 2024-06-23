import { createYoga } from "./yoga.createYoga.js";
import { editYoga } from "./yoga.editYoga.js";
import { getRandomYoga } from "./yoga.getRandomYoga.js";
import { getYogasByCategory } from "./yoga.getYogaByCategory.js";
import { getYogaDetail } from "./yoga.getYogaDetail.js";
import { getYogasByLevel } from "./yoga.getYogasByLevel.js";

export const YogaService = {
  createYoga,
  getYogaDetail,
  getYogasByLevel,
  getYogasByCategory,
  getRandomYoga,
  editYoga,
};
