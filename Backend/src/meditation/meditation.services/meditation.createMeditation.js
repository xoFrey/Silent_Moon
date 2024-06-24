import { uploadImage } from "../../utils/uploads.js";
import { Meditation } from "../meditation.model.js";

export const createMeditation = async (meditationInfo) => {
  if (meditationInfo.fileUrl) {
    const uploadResult = await uploadImage(
      meditationInfo.fileUrl.buffer,
      "files",
    );
    meditationInfo.fileUrl = uploadResult.secure_url;
  } else {
    meditationInfo.fileUrl = user.fileUrl;
  }

  const createdMeditation = await Meditation.create(meditationInfo);
  return createdMeditation;
};
