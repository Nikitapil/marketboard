export const getUniqueArray = <T>(array: T[]) => {
  return [...new Set(array)];
}