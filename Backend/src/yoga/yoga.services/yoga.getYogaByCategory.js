import { Yoga } from "../yoga.model.js";

export const getYogasByCategory = async (yogaByCategory) => {
  const yogas =
    yogaByCategory === "All"
      ? await Yoga.find({})
      : await Yoga.find({ category: yogaByCategory });

  if (yogas.length === 0) throw new Error("No yogas by this category found");

  return yogas;
};
