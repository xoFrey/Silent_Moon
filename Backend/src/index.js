import express, { json, request } from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieSession from "cookie-session";
import "dotenv/config";
import { userRoutes } from "./user/user.routes.js";
import { yogaRoutes } from "./yoga/yoga.routes.js";
import { meditationRoutes } from "./meditation/meditation.routes.js";

const app = express();
const PORT = process.env.PORT;

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.set("trust proxy", 1);
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret,
  httpOnly: true,
  expires: new Date(Date.now() + twoWeeksInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

const upload = multer({ dest: "./uploads" });
app.post("/api/v1/files/upload", upload.single("files"), (req, res) => {
  res.json({ fileUrl: req.file.filename });
});

// *spotify stuff
// const client_id = "b99a64db48bb4c6cb84dc49969b0a254";
// const redirect_uri = "http://localhost:5173";

// app.get("/login", function (req, res) {
//   // const state = generateRandomString(16);
//   const scope = "user-read-private%20user-read-email";
//   console.log(
//     `https://accounts.spotify.com/authorize?&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`,
//   );

//   res.redirect(
//     `https://accounts.spotify.com/authorize?&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`,
//   );
// });

// app.get("/callback", function (req, res) {
//   const code = req.query.code || null;
//   const state = req.query.state || null;
//   const client_secret = "1ba811e274e44cd682d4bbbc57946d6b";

//   if (state === null) {
//     res.redirect(
//       "/#" +
//         JSON.stringify({
//           error: "state_mismatch",
//         }),
//     );
//   } else {
//     const authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//       },
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic " +
//           new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//       },
//       json: true,
//     };
//   }
// });

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/yoga", yogaRoutes);
app.use("/api/v1/meditation", meditationRoutes);

await mongoose.connect(process.env.MONGO_URL, { dbName: "SilentMoon" });
app.listen(PORT, () => console.log("Server ready at", PORT));
