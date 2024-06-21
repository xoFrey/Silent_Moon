import { User } from "../../user/user.model.js";
import { Yoga } from "../yoga.model.js";

export const getYogasByCategory = async (yogaByCategory, userId) => {
  if (yogaByCategory === "All") {
    const yogas = await Yoga.find({});
    if (yogas.length === 0) throw new Error("No yogas by this category found");
    return yogas;
  } else if (yogaByCategory === "Favorites") {
    const user = await User.findById(userId).populate("yogaFavorites");

    if (user.yogaFavorites.length === 0)
      throw new Error("No yogas by this category found");
    return user.yogaFavorites;
  } else {
    const yogas = await Yoga.find({
      category: yogaByCategory,
    });
    if (yogas.length === 0) throw new Error("No yogas by this category found");
    return yogas;
  }
};
