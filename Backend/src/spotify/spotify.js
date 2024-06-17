import express from "express";
import { SpotifyController } from "./spotify.controller.js";

export const spotifyRouter = express
  .Router()
  .post("/track", SpotifyController.getTrack)
  .post("/auth", SpotifyController.spotifyAuth);
