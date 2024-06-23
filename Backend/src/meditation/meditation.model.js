import mongoose from "mongoose";

const meditationSchema = new mongoose.Schema(
  {
    fileUrl: { type: String },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Expert"] },
    duration: { type: String, require: true },
    category: { type: String, enum: ["Anxious", "Sleep", "Kids"] },
    playlistId: { type: String, require: true },
    randomExerciseDate: { type: String },
  },
  { collection: "meditations", timestamps: true }
);

export const Meditation = mongoose.model("Meditation", meditationSchema);
