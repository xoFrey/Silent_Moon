import { Yoga } from "../yoga.model.js";

export const getYogaDetail = async (yogaId) => {
  console.log(yogaId);
  const yoga = await Yoga.findById(yogaId);
  if (!yoga) throw new Error("Yoga with this id not found");

  return yoga;
};
