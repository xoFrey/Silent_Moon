import { Yoga } from "../yoga.model.js";

export const getYogasByLevel = async (yogaByLevel) => {
  const yogas =
    yogaByLevel === "All"
      ? await Yoga.find({})
      : await Yoga.find({ level: yogaByLevel });

  if (yogas.length === 0) throw new Error("No yogas by this level found");

  return yogas;
};
