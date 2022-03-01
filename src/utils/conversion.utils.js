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
  const minMatch = duration.match(/[0-9]+M/);
  const secMatch = duration.match(/[0-9]+S/);
  const min = minMatch ? parseInt(minMatch[0]) : 0;
  const sec = secMatch ? parseInt(secMatch[0]) : 0;
  return min * 60 + sec;
}

export const searchTrackTemplate = (song, artist) =>
  `song ${song} by ${artist} audio type`;

export const secondsToMins = (sec) =>
  `${Math.floor(sec / 60)}:${("0" + (Math.floor(sec) % 60)).slice(-2)}`;
