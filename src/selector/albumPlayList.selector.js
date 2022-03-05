import { selector, selectorFamily } from "recoil";
import {
  albumPlayListTrackState,
  searchTrackState,
  albumPlaylistParamState,
} from "../atoms/albumPlayList.atom.js";
import { musixToken } from "../utils/auth.utils.js";
import { musixAxios } from "../utils/axios.utils.js";
import ROUTER from "../utils/constants/router.constants.js";
import { PLAYMODE } from "../utils/constants/trackState.constants.js";
import { searchTrackTemplate } from "../utils/conversion.utils.js";
import {
  getAlbum,
  getPlayListDetails,
  getTracks,
} from "../utils/spotify.utils.js";
import { getRecommendState, uPlaylistState } from "./content.selector.js";

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
      const nextIdx = idx + 1 === items.length ? 0 : idx + 1;
      const nextTrack = items[nextIdx];
      return {
        currentItem: items[idx],
        idx: nextIdx,
        totalLength: items.length,
        nextSearchTrack: searchTrackTemplate(
          nextTrack.song,
          nextTrack.artists[0].name
        ),
      };
    }
    return { idx, nextSearchTrack: get(searchTrackState) };
  },
  set: ({ set, get }, { id, searchTrack, type, albumPlayListId }) => {
    const albumPlayListDetails = get(
      albumPlayListDetailsSate({ type, id: albumPlayListId })
    );
    const items =
      albumPlayListDetails?.tracks?.items || albumPlayListDetails?.tracks || [];
    const modItems = items.map((item) => {
      const name = item?.track?.name || item?.name;
      const artists = item?.track?.artists || item?.artists;
      const itemId = item?.track?.id || item?.id;
      const imageSource =
        item?.track?.album?.images?.[0]?.url ||
        item?.album?.images?.[0]?.url ||
        albumPlayListDetails?.images?.[0]?.url;
      return {
        itemId,
        imageSource,
        song: name,
        artists,
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
      if (type === ROUTER.ALBUM) return get(albumState(id));
      else if (type === ROUTER.PLAYLIST) return get(playlistState(id));
      else if (type === "uPlaylist") {
        const data = get(uPlaylistState);
        const foundIdx = data?.rows.findIndex((ele) => ele.id === id);
        if (foundIdx > -1) {
          const dailyMix = data.rows[foundIdx];
          const { artistIds, genres, trackIds } = dailyMix;
          const items =
            get(
              getRecommendState({
                artistIds,
                genres,
                trackIds: trackIds.split(",").slice(0, 2).join(),
                limit: 20,
              })
            )?.tracks ?? [];
          return {
            ...dailyMix,
            tracks: items,
          };
        }
      } else if (type === "collection") {
        const rows = get(likedItemsSelectorState);
        const ids = Object.entries(rows)
          .filter((row) => row[1] == "track")
          .map((row) => row[0])
          .join();
        const tracks = get(trackState(ids)) ?? [];
        return {
          id: "tracks",
          type,
          name: "Liked Songs",
          description: "",
          imgUrl: `${tracks[0]?.album?.images[0]?.url}`,
          tracks,
        };
      }
    },
});

export const likedItemsSelectorState = selector({
  key: "likedItemsSelectorState",
  get: async () => {
    try {
      const resp = await musixAxios(musixToken()).get("/liked/");
      return resp.data?.rows;
    } catch (e) {
      throw e;
    }
  },
});

export const trackState = selectorFamily({
  key: "trackState",
  get: (ids) => async () => {
    const [data, error] = await getTracks({ ids });
    if (error) throw undefined;
    return data?.tracks;
  },
});
