import express from "express";
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
const spotify_client_id = process.env.SPOTIFY_CLIEND_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIEND_SECRET;

app.get("/auth/login", (req, res) => {
  const scope =
    "streaming\
                user-read-email\
                user-read-private";

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_url: "http://localhost:3000/auth/callback",
  });
});

app.get("/auth/callback", (req, res) => {});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/yoga", yogaRoutes);
app.use("/api/v1/meditation", meditationRoutes);

await mongoose.connect(process.env.MONGO_URL, { dbName: "SilentMoon" });
app.listen(PORT, () => console.log("Server ready at", PORT));
