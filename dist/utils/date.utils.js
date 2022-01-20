export const getSalutation = () => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return "Good Morning";
  else if (hours >= 12 && hours < 18) return "Good Afternoon";
  else return "Good Evening";
};

export const extractContentByTime = (items) => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return items[0];
  else if (hours >= 12 && hours < 18) return items[1];
  else return items[2];
};
