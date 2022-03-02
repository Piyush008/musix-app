import { selector } from "recoil";
import { genreParamState } from "../atoms/genre.atoms.js";
import {
  contentWrapperState,
  getRecommendSelectorState,
  getTopArtistState,
  recentlyPlayedSelectorState,
  topPlayItemsSelectorState,
  uPlaylistState,
} from "./content.selector.js";

export const genreContentState = selector({
  key: "genreContentState",
  get: ({ get }) => {
    const params = get(genreParamState);
    const { as, property, limit } = params;
    if (as === "user") {
      if (property === "recently")
        return get(recentlyPlayedSelectorState(limit));
      else if (property === "mixes") return get(uPlaylistState);
      else if (property === "topPlayItems")
        return get(topPlayItemsSelectorState(limit))[0];
    } else if (as === "recommend") {
      const artists = get(getTopArtistState);
      const artist = artists.find((artist) => artist.id === property);
      if (artist) {
        return get(getRecommendSelectorState({ artist, size: limit }));
      }
      return null;
    }
    return get(contentWrapperState(params));
  },
});
