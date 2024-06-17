import { Yoga } from "../yoga.model.js";

export const getAllYogas = async () => {
  const yogas = await Yoga.find({});
  if (!yogas) throw new Error("Not a single yoga found");

  return yogas;
};
