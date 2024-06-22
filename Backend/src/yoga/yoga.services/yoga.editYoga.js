import { Yoga } from "../yoga.model.js";

export const editYoga = async (yogaId, updateInfo) => {
  const yoga = await Yoga.findById(yogaId);

  if (!yoga) throw new Error("Yoga not found");

  const updatedYoga = await Yoga.findByIdAndUpdate(
    yogaId,
    { $set: updateInfo },
    { new: true },
  );

  return updatedYoga;
};
