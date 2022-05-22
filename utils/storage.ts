export const saveToStorage = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getFromStorage = (key: string) => {
  const inStorage = localStorage.getItem(key);
  return inStorage ? JSON.parse(inStorage) : [];
};
