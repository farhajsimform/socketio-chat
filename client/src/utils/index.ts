import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const randomName = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
});

export const removeDuplicateObjects = (array: any) => {
  const uniqueObjects = Array.from(new Set(array.map(JSON.stringify))).map(
    JSON.parse as any
  );
  return uniqueObjects as any;
};
