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
import { spotifyRouter } from "./spotify/spotify.router.js";
import cloudinary from "cloudinary";

const app = express();
const PORT = process.env.PORT;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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
const upload = multer({ dest: "./uploads" });
app.post("/api/v1/files/upload", upload.single("files"), (req, res) => {
  res.json({ fileUrl: req.file.filename });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/yoga", yogaRoutes);
app.use("/api/v1/meditation", meditationRoutes);
app.use("/api/v1/spotify", spotifyRouter);

await mongoose.connect(process.env.MONGO_URL, { dbName: "SilentMoon" });
app.listen(PORT, () => console.log("Server ready at", PORT));
