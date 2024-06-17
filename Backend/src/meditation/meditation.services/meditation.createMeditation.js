import { Meditation } from "../meditation.model.js";

export const createMeditation = async (meditationInfo) => {
  const createdMeditation = await Meditation.create(meditationInfo);
  return createdMeditation;
};
