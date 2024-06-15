import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";
import { generateRandomSixDigitCode, userToView } from "../user.helpers.js";

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
  image,
}) {
  const foundUserWithEmail = await User.findOne({ email });
  if (foundUserWithEmail)
    throw new Error("User with this email already exists");

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const sixDigitCode = generateRandomSixDigitCode;

  const user = await User.create({
    firstName,
    lastName,
    email,
    fileUrl: image,
    password: passwordHash,
    isEmailVerified: false,
    sixDigitCode,
  });
  const accessToken = createToken(user, "access"); // header.payload.signature
  const refreshToken = createToken(user, "refresh"); // header.payload.signature
  // console.log(refreshToken);

  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
  };
}
