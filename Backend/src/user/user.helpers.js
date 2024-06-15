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

export const generateRandomSixDigitCode = () => {
  return Math.random().toString().slice(2, 8);
};
