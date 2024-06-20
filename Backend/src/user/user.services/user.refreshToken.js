import { createToken } from "../../utils/createToken.js";
import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";

export const refreshToken = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  if (!user.isVerified) throw new Error("User is not verified");

  const newAccessToken = createToken(user, "access");
  return { user: userToView(user), newAccessToken };
};
