import { Meditation } from "../meditation.model.js";

export const getMeditationsByLevel = async (meditationByLevel) => {
  const meditations =
    meditationByLevel === "All"
      ? await Meditation.find({})
      : await Meditation.find({ level: meditationByLevel });

  if (meditations.length === 0)
    throw new Error("No meditations by this level found");

  return meditations;
};
