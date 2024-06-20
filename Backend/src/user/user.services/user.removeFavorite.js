import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const removeFavorite = async (updateInfo) => {
  const user = await User.findById(updateInfo.userId)
    .populate("meditationFavorites")
    .populate("yogaFavorites");
  if (!user) throw new Error("User not found");

  if (
    user.yogaFavorites.some((item) => item._id.toString() !== updateInfo.id) &&
    user.meditationFavorites.some(
      (item) => item._id.toString() !== updateInfo.id,
    )
  )
    throw "Id not found";

  if (
    user.yogaFavorites.some((item) => item._id.toString() === updateInfo.id)
  ) {
    const userUpdate = await User.findByIdAndUpdate(
      updateInfo.userId,
      { $pull: { yogaFavorites: updateInfo.id } },
      { new: true },
    );
    console.log(userUpdate, "yoga");
    return userToView(userUpdate);
  } else {
    const userUpdate = await User.findByIdAndUpdate(
      updateInfo.userId,
      { $pull: { meditationFavorites: updateInfo.id } },
      { new: true },
    );

    console.log(userUpdate);
    return userToView(userUpdate);
  }
};
