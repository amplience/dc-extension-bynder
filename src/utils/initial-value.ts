import { isObject } from "./is-object";
import { isObjectEmpty } from "./is-object-empty";

export const normaliseInitialValue = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (isObject(value) && isObjectEmpty(value)) {
    return [];
  }
  return [value];
};
