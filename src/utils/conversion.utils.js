import { extractContentByTime } from "./date.utils.js";

export const content = [
  "toplists",
  ["workout", "dinner", "sleep"],
  "fresh_finds",
  "mood",
  "focus",
  { as: "release", property: "release" },
  { as: "featured", property: "featured" },
  "at_home",
];

export const authContent = [
  "toplists",
  ["workout", "dinner", "sleep"],
  { as: "release", property: "release" },
  { as: "featured", property: "featured" },
  ["mood", "focus", "at_home"],
];
export const showContentConversionUtil = (contents) => {
  return contents.map((item) => {
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
  `song ${song} by ${artist} audio lyrics`;

export const secondsToMins = (sec) =>
  `${Math.floor(sec / 60)}:${("0" + (Math.floor(sec) % 60)).slice(-2)}`;

/**
 * @description Use Only for getting new Array value for setAlbumPlayListTrack play/pause
 * @param prevState @param value @param index
 * @returns newState
 */
export const getNewStateForPlayPause = (prevState, value, index) => ({
  ...prevState,
  isPlaying: value,
  items: [
    ...prevState.items.slice(0, index),
    {
      ...prevState.items[index],
      isPlaying: value,
    },
    ...prevState.items.slice(index + 1),
  ],
});
