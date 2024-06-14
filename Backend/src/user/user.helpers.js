export const userToView = (user) => {
  return {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    fileUrl: user.fileUrl,
    isVerified: user.isVerified,
    yogaFavorites: user.yogaFavorites,
    meditationFavorites: user.meditationFavorites,
  };
};
