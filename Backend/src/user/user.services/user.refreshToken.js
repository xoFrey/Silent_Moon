import { createToken } from "../../utils/createToken.js";
import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const refreshToken = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId)
    .populate("meditationFavorites")
    .populate("yogaFavorites");
  if (!user) throw new Error("User not found");

  const newAccessToken = createToken(user, "access");
  return { user: userToView(user), newAccessToken };
};
