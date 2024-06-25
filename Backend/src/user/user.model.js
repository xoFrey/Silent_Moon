import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    fileUrl: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dieqrawak/image/upload/v1719309142/Silent_Moon/files/vqicm9bxfwpa2mndjshr.jpg",
    },
    password: { type: String, required: true, trim: true },
    isVerified: { type: Boolean, default: false },
    isGuest: { type: Boolean, default: false },
    sixDigitCode: { type: String, required: true },
    alertTime: { type: String, default: "10:00" },
    alertWeekdays: [{ type: String, required: false }],
    userLevel: { type: String, enum: ["Beginner", "Intermediate", "Expert"] },
    yogaFavorites: [{ type: mongoose.Types.ObjectId, ref: "Yoga" }],
    meditationFavorites: [{ type: mongoose.Types.ObjectId, ref: "Meditation" }],
  },
  { collection: "users", timestamps: true },
);

export const User = mongoose.model("User", userSchema);
