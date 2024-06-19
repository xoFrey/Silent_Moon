export const convertMStoMinSek = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const secondsWithZero = seconds < 10 ? "0" + seconds : seconds;

  return `${minutes}:${secondsWithZero}`;
};

export const convertDateAndTime = (dateString) => {
  const date = new Date(dateString);

  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const time = date.toLocaleTimeString("de-DE", timeOptions);

  return time;
};
