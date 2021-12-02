export const getLabelOfDate = (stringDate) => {
  const dateSplitted = stringDate.slice(0, 10).split("-");
  const date = new Date(
    parseInt(dateSplitted[0]),
    parseInt(dateSplitted[1]) - 1,
    parseInt(dateSplitted[2]),
    12,
    12,
    12
  );
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  return date.toLocaleDateString("es-MX", options);
};