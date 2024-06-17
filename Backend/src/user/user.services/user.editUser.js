import { User } from "../user.model";

export const editUser = async (updateInfo) => {
  const user = await User.findById(updateInfo.userId);
  if (!user) throw new Error("User not found");

  const updatedUser = User.findByIdAndUpdate(
    updateInfo.userId,
    { $set: updateInfo },
    { new: true },
  );

  return updatedUser;
};
