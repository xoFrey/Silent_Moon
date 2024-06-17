import { Meditation } from "../meditation.model.js";

export const getAllMeditations = async () => {
  const meditations = await Meditation.find({});
  if (!meditations) throw new Error("Not a single meditation found");

  return meditations;
};
