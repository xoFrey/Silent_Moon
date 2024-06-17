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

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = "http://localhost:5173/music";
const code = "code"; // Diese Variable wird nicht verwendet, aber behalten, falls sie später benötigt wird

let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  body: new URLSearchParams({
    grant_type: "client_credentials",
  }),
};

app.post("/auth", async (req, res) => {
  try {
    const response = await fetch(authOptions.url, {
      method: "POST",
      headers: {
        Authorization: authOptions.headers.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: authOptions.body,
    });

    if (response.ok) {
      const token = await response.json();
      // accessToken = token;
      console.log(token);
      res.send("Token generated");
    } else {
      res.status(response.status || 500).send("Error: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error.message);
  }
});
// app.get("/login", function (req, res) {
//   // const state = generateRandomString(16);
//   const scope = "user-read-private%20user-read-email";

//   res.redirect(
//     `https://accounts.spotify.com/authorize?&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`,
//   );
// });

// app.get("/callback", function (req, res) {
//   const code = req.query.code || null;
//   const state = req.query.state || null;

//   if (state === null) {
//     res.redirect(
//       "/#" +
//         JSON.stringify({
//           error: "state_mismatch",
//         }),
//     );
//   } else {
//   }
// });

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/yoga", yogaRoutes);
app.use("/api/v1/meditation", meditationRoutes);

await mongoose.connect(process.env.MONGO_URL, { dbName: "SilentMoon" });
app.listen(PORT, () => console.log("Server ready at", PORT));
