import { selector } from "recoil";
import { genreParamState } from "../atoms/genre.atoms.js";
import { contentWrapperState } from "./content.selector.js";

export const genreContentState = selector({
  key: "genreContentState",
  get: ({ get }) => {
    const params = get(genreParamState);
    return get(contentWrapperState(params));
  },
});
