import { Yoga } from "../yoga.model.js";

export const editYoga = async (yogaId, updateInfo) => {
  const yoga = await Yoga.findById(yogaId);
  if (!yoga) throw new Error("Yoga not found");

  if (updateInfo.fileUrl) {
    const uploadResult = await uploadImage(updateInfo.fileUrl.buffer, "files");
    updateInfo.fileUrl = uploadResult.secure_url;
  } else {
    updateInfo.fileUrl = user.fileUrl;
  }

  const updatedYoga = await Yoga.findByIdAndUpdate(
    yogaId,
    { $set: updateInfo },
    { new: true },
  );

  return updatedYoga;
};
