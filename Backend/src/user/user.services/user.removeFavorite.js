import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const removeFavorite = async (updateInfo) => {
  const user = await User.findById(updateInfo.userId);
  if (!user) throw new Error("User not found");

  console.log(user.meditationFavorites);
  if (
    !user.yogaFavorites.includes(updateInfo.id) &&
    !user.meditationFavorites.includes(updateInfo.id)
  )
    throw new Error("Id not found");

  if (user.yogaFavorites.includes(updateInfo.id)) {
    const userUpdate = await User.findByIdAndUpdate(
      updateInfo.userId,
      { $pull: { yogaFavorites: updateInfo.id } },
      { new: true },
    );
    return userToView(userUpdate);
  } else {
    const userUpdate = await User.findByIdAndUpdate(
      updateInfo.userId,
      { $pull: { meditationFavorites: updateInfo.id } },
      { new: true },
    );
    return userToView(userUpdate);
  }
};
