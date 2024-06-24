export const userToView = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    fileUrl: user.fileUrl,
    isVerified: user.isVerified,
    userLevel: user.userLevel,
    isGuest: user.isGuest,
    alertTime: user.alertTime,
    alertWeekdays: user.alertWeekdays,
    yogaFavorites: user.yogaFavorites,
    meditationFavorites: user.meditationFavorites,
  };
};

export const generateRandomSixDigitCode = () => {
  return Math.random().toString().slice(2, 8);
};
