export const storageColumnsDefault =
  '[{"id":1,"title":"Queue","cards":[]},{"id":2,"title":"Development","cards":[]},{"id":3,"title":"Done","cards":[]}]';

export const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (!date) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  return day + " " + month;
};
