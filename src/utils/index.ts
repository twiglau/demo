export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const apiUrl = process.env.REACT_APP_API_URL


export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    
    // @ts-ignore
    const val = result[key];
    if (isFalsy(val)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
