import { Meditation } from "../meditation.model.js";

export const getMeditationsByLevel = async (meditationByLevel) => {
  const meditations = await Meditation.find({ level: meditationByLevel });

  if (!meditations) throw new Error("No meditations by this level found");

  return meditations;
};
