import { Meditation } from "../meditation.model.js";

export const getMeditationDetail = async (meditationId) => {
  const meditation = await Meditation.findById(meditationId);
  if (!meditation) throw new Error("Meditation with this id not found");

  return meditation;
};
