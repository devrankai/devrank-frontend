export const persistLocalStorage = (
  key: string,
  value: Record<string, any>
) => {
  localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = <T extends Record<string, any>>(
  key: string
): T | undefined => {
  const value = localStorage.getItem(key);

  if (value) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(
        `Error parsing localStorage value for key '${key}': ${error}`
      );
      return undefined;
    }
  }

  return undefined;
};
