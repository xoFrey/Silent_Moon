import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const editUser = async (updateInfo) => {
  console.log(updateInfo);
  const user = await User.findById(updateInfo.userId);

  if (!user) throw new Error("User not found");

  const updatedUser = await User.findByIdAndUpdate(
    updateInfo.userId,
    { $set: updateInfo },
    { new: true },
  )
    .populate("meditationFavorites")
    .populate("yogaFavorites");
  console.log(userToView(updatedUser));
  return userToView(updatedUser);
};
