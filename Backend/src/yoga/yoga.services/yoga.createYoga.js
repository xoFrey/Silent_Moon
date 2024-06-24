import { Yoga } from "../yoga.model.js";

export const createYoga = async (yogaInfo) => {
  if (yogaInfo.fileUrl) {
    const uploadResult = await uploadImage(yogaInfo.fileUrl.buffer, "files");
    yogaInfo.fileUrl = uploadResult.secure_url;
  } else {
    yogaInfo.fileUrl = user.fileUrl;
  }

  const createdYoga = await Yoga.create(yogaInfo);
  return createdYoga;
};
