import { uploadImage } from "../../utils/uploads.js";
import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const editUser = async (updateInfo) => {
  const user = await User.findById(updateInfo.userId)
    .populate("meditationFavorites")
    .populate("yogaFavorites");

  if (!user) throw new Error("User not found");

  if (updateInfo.fileUrl) {
    console.log("fileurl exists");
    const uploadResult = await uploadImage(updateInfo.fileUrl.buffer, "files");
    updateInfo.fileUrl = uploadResult.secure_url;
  } else {
    updateInfo.fileUrl = user.fileUrl;
  }

  const updatedUser = await User.findByIdAndUpdate(
    updateInfo.userId,
    { $set: updateInfo },
    { new: true },
  )
    .populate("meditationFavorites")
    .populate("yogaFavorites");

  return userToView(updatedUser);
};
