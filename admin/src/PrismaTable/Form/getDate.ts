export const getDate = (date: Date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const addZero = (value: number) => (value < 10 ? '0' + value : value);
  return `${year}-${addZero(month)}-${addZero(day)}T${addZero(hours)}:${addZero(
    minutes,
  )}:${addZero(seconds)}`;
};
