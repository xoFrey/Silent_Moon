import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";
import { Yoga } from "../../yoga/yoga.model.js";
import { Meditation } from "../../meditation/meditation.model.js";

export const addFavorite = async (updateInfo) => {
  const meditation = Meditation.findById(updateInfo.id);
  if (!meditation) throw new Error("Meditation does not exist");

  const yoga = Yoga.findById(updateInfo.id);
  if (!yoga) throw new Error("Yoga does not exist");
  if (!yoga && !meditation) throw new Error("Id not found");

  const user = User.findById(updateInfo.userId);
  if (!user) throw new Error("User not found");

  if (user.yogaFavorites.includes(updateInfo.id))
    throw new Error("You already like this Yoga!");
  if (user.meditationFavorites.includes(updateInfo.id))
    throw new Error("You already like this Meditation!");

  const updatedUser = await User.findByIdAndUpdate(
    updateInfo.userId,
    yoga
      ? ({
          $push: {
            yogaFavorites: updateInfo.id,
          },
        },
        { new: true })
      : ({
          $push: {
            meditationFavorites: updateInfo.id,
          },
        },
        { new: true })
  );

  return {
    user: userToView(updatedUser),
  };
};
