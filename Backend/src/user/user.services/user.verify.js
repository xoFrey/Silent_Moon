import { User } from "../user.model.js";

export async function verifyUserEmail({ userId, sixDigitCode }) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const codeMatched = user.sixDigitCode === sixDigitCode;
  if (!codeMatched) throw new Error("Invalid six digit code, please try again");

  user.isVerified = true;
  await user.save();

  // await User.findByIdAndUpdate(userId, { $set: { isVerified: true } });

  return { message: "You can now log in" };
}
