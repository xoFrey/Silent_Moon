import express from "express";
import { SpotifyController } from "./spotify.controller.js";

export const spotifyRouter = express
  .Router()
  .post("/auth", SpotifyController.spotifyAuth)
  .post("/playlist", SpotifyController.getPlaylist)
  .post("/track", SpotifyController.getTrack);
