export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const val = result[key];
    if (isFalsy(val)) {
      delete result[key];
    }
  });
  return result;
};
