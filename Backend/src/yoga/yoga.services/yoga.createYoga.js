import { Yoga } from "../yoga.model.js";

export const createYoga = async (yogaInfo) => {
  const createdYoga = await Yoga.create(yogaInfo);
  return createdYoga;
};
