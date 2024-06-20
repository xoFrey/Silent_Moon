import bcrypt from "bcrypt";
import { User } from "../user.model.js";
import { userToView } from "../user.helpers.js";
import { createToken } from "../../utils/createToken.js";

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email })
    .populate("meditationFavorites")
    .populate("yogaFavorites");
  if (!user) throw new Error("Invalid login");

  // if (!user.isVerified)
  //   throw new Error("Email not verified, please verify first!");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Password is incorrect - try again");

  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");

  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
  };
}
