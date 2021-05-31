export const getUtcDate = (date: Date): Date => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const subtractTimezoneOffset = (date: Date): Date => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
};
