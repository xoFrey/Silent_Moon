import { Meditation } from "../meditation.model.js";

export const getMeditationsByCategory = async (meditationByCategory) => {
  const meditations =
    meditationByCategory === "All"
      ? await Meditation.find({})
      : await Meditation.find({ category: meditationByCategory });

  if (meditations.length === 0)
    throw new Error("No meditations by this category found");

  return meditations;
};
