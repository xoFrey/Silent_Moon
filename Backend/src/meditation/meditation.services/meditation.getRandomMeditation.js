import { User } from "../../user/user.model.js";
import { Meditation } from "../meditation.model.js";

export const getRandomMeditation = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("No user with this ID found");
  const userLevel = user.userLevel;
  const meditationsByLevel = Meditation.find({ level: userLevel });
  if (!meditationsByLevel) throw new Error("No meditation by this level found");
  console.log("MEDIT", meditationsByLevel);

  const generateRandomMeditation = (meditationsByLevel) =>
    Math.floor(Math.random() * meditationsByLevel.length);
  console.log(
    "generateRandomMeditation",
    generateRandomMeditation(meditationsByLevel)
  );

  // return randomMeditation;
};
