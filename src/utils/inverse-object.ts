export const inverseObject = (object: Record<string, unknown>): Record<string, unknown> => {
  return Object.keys(object).reduce(
    (reversedObj, key) => {
      const value = object[key] as string;

      reversedObj[value] = key;

      return reversedObj;
    },
    {} as Record<string, unknown>,
  );
};
