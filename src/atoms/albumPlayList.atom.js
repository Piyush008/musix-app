import { atom } from "recoil";

export const searchTrackState = atom({
  key: "searchTrackState",
  default: "",
});

export const albumPlayListTrackState = atom({
  key: "albumPlayListTrackState",
  default: null,
});

export const albumPlaylistParamState = atom({
  key: "albumPlaylistParamState",
  default: null,
});
