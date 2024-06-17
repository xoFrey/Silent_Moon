import { createToken } from "../../utils/createToken.js";
import { User } from "../user.model.js";

export const refreshToken = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  if (!user.isVerified) throw new Error("User is not verified");
  //   if (user.isBlocked) throw new Error("User blocked");

  const newAccessToken = createToken(user, "access");
  return { newAccessToken };
};
