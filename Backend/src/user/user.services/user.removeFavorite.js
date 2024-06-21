import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const removeFavorite = async (updateInfo) => {
  const user = await User.findById(updateInfo.userId)
    .populate("meditationFavorites")
    .populate("yogaFavorites");
  if (!user) throw new Error("User not found");

  // if (user.yogaFavorites.some((item) => item._id.toString() !== updateInfo.id))
  //   throw new Error("Yoga ID not found");
  // if (
  //   user.meditationFavorites.some(
  //     (item) => item._id.toString() !== updateInfo.id,
  //   )
  // )
  //   throw new Error("Meditation ID not found");

  const isFavYoga = user.yogaFavorites.some(
    (item) => item._id.toString() === updateInfo.id,
  );
  console.log(isFavYoga);
  if (isFavYoga) {
    const userUpdate = await User.findByIdAndUpdate(
      updateInfo.userId,
      { $pull: { yogaFavorites: updateInfo.id } },
      { new: true },
    )
      .populate("meditationFavorites")
      .populate("yogaFavorites");
    console.log("hi i remove yoga");
    return userToView(userUpdate);
  } else {
    const userUpdate = await User.findByIdAndUpdate(
      updateInfo.userId,
      { $pull: { meditationFavorites: updateInfo.id } },
      { new: true },
    )
      .populate("meditationFavorites")
      .populate("yogaFavorites");

    return userToView(userUpdate);
  }
};
