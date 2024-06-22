import mongoose from "mongoose";

const yogaSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: false, default: "http://test" },
    videoUrl: { type: String, required: false },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Expert"] },
    duration: { type: String, require: true },
    category: { type: String, enum: ["Anxious", "Sleep", "Kids"] },
  },
  { collection: "yogas", timestamps: true },
);

export const Yoga = mongoose.model("Yoga", yogaSchema);
