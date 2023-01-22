const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export { showFormattedDate };
