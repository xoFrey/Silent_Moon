import { User } from "../../user/user.model.js";
import { Meditation } from "../meditation.model.js";

export const getMeditationsByCategory = async (
  meditationByCategory,
  userId,
) => {
  if (meditationByCategory === "All") {
    const meditations = await Meditation.find({});
    if (meditations.length === 0)
      throw new Error("No meditations by this category found");
    return meditations;
  } else if (meditationByCategory === "Favorites") {
    const user = await User.findById(userId).populate("meditationFavorites");

    if (user.meditationFavorites.length === 0)
      throw new Error("No meditations by this category found");
    return user.meditationFavorites;
  } else {
    const meditations = await Meditation.find({
      category: meditationByCategory,
    });
    if (meditations.length === 0)
      throw new Error("No meditations by this category found");
    return meditations;
  }
};
