import { User } from "../../user/user.model.js";
import { Meditation } from "../meditation.model.js";

export const getRandomMeditation = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("No user with this ID found");
  const userLevel = user.userLevel;

  const meditationsByLevel =
    userLevel === "All"
      ? await Meditation.find({})
      : await Meditation.find({ level: userLevel });
  if (!meditationsByLevel) throw new Error("No meditation by this level found");

  const generateRandomMeditation = (meditationsByLevel) =>
    Math.floor(Math.random() * meditationsByLevel.length);
  const randomMeditation =
    meditationsByLevel[generateRandomMeditation(meditationsByLevel)];

  return randomMeditation;
};
