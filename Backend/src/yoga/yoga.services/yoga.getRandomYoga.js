import { User } from "../../user/user.model.js";
import { Yoga } from "../yoga.model.js";

export const getRandomYoga = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("No user with this ID found");
  const userLevel = user.userLevel;
  const yogasByLevel =
    userLevel === "All"
      ? await Yoga.find({})
      : await Yoga.find({ level: userLevel });
  if (!yogasByLevel) throw new Error("No yoga by this level found");

  const generateRandomYoga = (yogasByLevel) =>
    Math.floor(Math.random() * yogasByLevel.length);
  const randomYoga = yogasByLevel[generateRandomYoga(yogasByLevel)];

  return randomYoga;
};
