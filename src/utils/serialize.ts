export const serialize = (data: Record<string, any>) => {
  return JSON.parse(JSON.stringify(data));
};
