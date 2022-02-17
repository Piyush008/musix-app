import { selector, selectorFamily } from "recoil";
import {
  albumPlayListTrackState,
  searchTrackState,
  albumPlaylistParamState,
} from "../atoms/albumPlayList.atom.js";
import { PLAYMODE } from "../utils/constants/trackState.constants.js";
import { searchTrackTemplate } from "../utils/conversion.utils.js";
import { getAlbum, getPlayListDetails } from "../utils/spotify.utils.js";

export const albumPlayListSelectorTrackState = selector({
  key: "albumPlayListSelectorTrackState",
  get: ({ get }) => {
    const albumPlayListTrack = get(albumPlayListTrackState);
    const items = albumPlayListTrack?.items ?? [];
    let idx = items?.findIndex(
      (track) =>
        track.isPlaying === PLAYMODE.PLAYING ||
        track.isPlaying === PLAYMODE.PAUSE
    );
    if (idx >= 0) {
      idx = idx + 1 === items.length ? 0 : idx + 1;
      const nextTrack = items[idx];
      return {
        idx,
        totalLength: items.length,
        nextSearchTrack: searchTrackTemplate(nextTrack.song, nextTrack.artist),
      };
    }
    return { idx, nextSearchTrack: get(searchTrackState) };
  },
  set: ({ set, get }, { id, searchTrack }) => {
    const albumPlayListParam = get(albumPlaylistParamState);
    const albumPlayListDetails = get(
      albumPlayListDetailsSate(albumPlayListParam)
    );
    const items = albumPlayListDetails?.tracks?.items ?? [];
    const modItems = items.map((item) => {
      const name = item?.track?.name || item?.name;
      const artists = item?.track?.artists || item?.artists;
      const itemId = item?.track?.id || item?.id;
      return {
        song: name,
        artist: artists[0].name,
        isPlaying: id === itemId ? PLAYMODE.PLAYING : PLAYMODE.INQUEUE,
      };
    });
    set(searchTrackState, searchTrack);
    set(albumPlayListTrackState, {
      id: albumPlayListDetails.id,
      isPlaying: PLAYMODE.PLAYING,
      items: modItems,
    });
  },
});

const albumState = selectorFamily({
  key: "albumState",
  get: (id) => async () => {
    const [data, error] = await getAlbum(id, { market: "IN" });
    if (error) throw error;
    return data;
  },
});

const playlistState = selectorFamily({
  key: "playlistState",
  get: (id) => async () => {
    const [data, error] = await getPlayListDetails(id, {
      id,
      market: "IN",
      limit: 20,
    });
    if (error) throw error;
    return data;
  },
});
export const albumPlayListDetailsSate = selectorFamily({
  key: "albumPlayListDetailsState",
  get:
    (params) =>
    async ({ get }) => {
      const { type, id } = params;
      if (type === "album") return get(albumState(id));
      else if (type === "playlist") return get(playlistState(id));
    },
});
