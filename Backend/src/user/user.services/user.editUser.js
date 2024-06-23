import { uploadImage } from "../../utils/uploads.js";
import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const editUser = async (updateInfo, fileUrl) => {
  console.log(updateInfo);
  const user = await User.findById(updateInfo.userId)
    .populate("meditationFavorites")
    .populate("yogaFavorites");

  if (!user) throw new Error("User not found");

  if (fileUrl) {
    const uploadResult = await uploadImage(fileUrl.buffer, "files");
    fileUrl = uploadResult.secure_url;
  } else {
    fileUrl = user.fileUrl;
  }
  console.log(fileUrl);
  const userInfo = {
    updateInfo,
    fileUrl: fileUrl,
  };

  const updatedUser = await User.findByIdAndUpdate(
    updateInfo.userId,
    { $set: userInfo },
    { new: true },
  )
    .populate("meditationFavorites")
    .populate("yogaFavorites");
  console.log(userToView(updatedUser));
  return userToView(updatedUser);
};
