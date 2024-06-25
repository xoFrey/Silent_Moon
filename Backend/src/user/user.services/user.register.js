import bcrypt from "bcrypt";
import { userToView } from "../user.helpers.js";
import { User } from "../user.model.js";
import { generateRandomSixDigitCode } from "../../utils/sixDigitCode.js";
import { createToken } from "../../utils/createToken.js";
import { sendEmail } from "../../utils/sendEmail.js";

export async function registerUser({
  username,
  firstname,
  lastname,
  email,
  image,
  password,
  userLevel,
}) {
  const foundUserWithEmail = await User.findOne({ email });
  if (foundUserWithEmail)
    throw new Error("User with this email already exists");

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const sixDigitCode = generateRandomSixDigitCode();

  const user = await User.create({
    username,
    firstname,
    lastname,
    email,
    fileUrl: image,
    password: passwordHash,
    isVerified: false,
    sixDigitCode,
    userLevel,
  });
  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");
  console.log(user);
  await sendEmailVerification(user);
  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
  };
}

async function sendEmailVerification(user) {
  return sendEmail({
    to: user.email,
    subject: "Welcome to Silent Moon",
    text: `Hi ${user.firstname},
welcome to Silent Moon
Please enter the below six-digit-code verify your account to be able to login.
${user.sixDigitCode}
See you on the other side :)
- Your Silent Moon Team
`,
  });
}
