import { extractContentByTime } from "./date.utils.js";

const content = [
  "toplists",
  ["workout", "dinner", "sleep"],
  "fresh_finds",
  "mood",
  "focus",
  { as: "release", property: "release" },
  { as: "featured", property: "featured" },
  "at_home",
];
export const showContentConversionUtil = () => {
  return content.map((item) => {
    if (typeof item === "string") return { as: "category", property: item };
    else if (Array.isArray(item))
      return { as: "category", property: extractContentByTime(item) };
    else return item;
  });
};

export function parseDurationIntoSec(duration) {
  const min = parseInt(duration.match(/[0-9]+M/)[0]);
  const sec = parseInt(duration.match(/[0-9]+S/)[0]);
  return min * 60 + sec;
}
