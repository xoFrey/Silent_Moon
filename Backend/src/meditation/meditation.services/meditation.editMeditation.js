import { Meditation } from "../meditation.model.js";

export const editMeditation = async (meditationId, updateInfo) => {
  const meditation = await Meditation.findById(meditationId);
  if (!meditation) throw new Error("Meditation not found");

  if (updateInfo.fileUrl) {
    const uploadResult = await uploadImage(updateInfo.fileUrl.buffer, "files");
    updateInfo.fileUrl = uploadResult.secure_url;
  } else {
    console.log("no");
  }

  const updatedMeditation = await Meditation.findByIdAndUpdate(
    meditationId,
    { $set: updateInfo },
    { new: true },
  );

  return updatedMeditation;
};
