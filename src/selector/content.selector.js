import { atom, selector, selectorFamily, waitForAll } from "recoil";
import { authState } from "../atoms/auth.atoms.js";
import { musixToken } from "../utils/auth.utils.js";
import { musixAxios } from "../utils/axios.utils.js";
import {
  authContent,
  content,
  showContentConversionUtil,
} from "../utils/conversion.utils.js";
import {
  getCategoryDetails,
  getCategoryPlayList,
  getFeaturedPlayList,
  getNewReleases,
  recommend,
} from "../utils/spotify.utils.js";
export const showContentState = selector({
  key: "showContentState",
  get: ({ get }) => {
    const auth = get(authState);
    const contents = auth.isAuth ? authContent : content;
    const metaData = showContentConversionUtil(contents);
    const data = metaData.map((content) => ({
      ...content,
      ...get(contentWrapperState({ ...content, limit: 6 })),
    }));
    return { data };
  },
});
export const showAuthContentState = selector({
  key: "showAuthContentState",
  get: async ({ get }) => {
    const data = [
      ...get(userMixesSelectorState),
      ...get(topPlayItemsSelectorState(6)),
      ...get(topArtistsSelectorState(6)),
      ...get(showContentState)?.data,
    ];
    return { data };
  },
});

export const contentWrapperState = selectorFamily({
  key: "contentWrapperState",
  get:
    (params) =>
    ({ get }) => {
      const { as, ...rest } = params;
      if (as == "category") {
        const catPlayListDetails = get(categoryPlayListState(rest));
        const catDetails = get(categoryState(rest));
        return { ...catPlayListDetails, message: catDetails };
      } else if (as == "release") {
        return get(newReleasesState(rest));
      } else if (as == "featured") {
        return get(featuredPlayListState(rest));
      }
    },
});

const categoryState = selectorFamily({
  key: "categoryState",
  get:
    ({ property }) =>
    async () => {
      const [data, error] = await getCategoryDetails(property, {
        country: "IN",
        locale: "en_IN",
      });
      if (error) throw error;
      return data;
    },
});
const categoryPlayListState = selectorFamily({
  key: "categoryPlayListState",
  get:
    ({ property, limit }) =>
    async () => {
      const [data, error] = await getCategoryPlayList(property, {
        country: "IN",
        limit,
      });
      if (error) throw error;
      return data;
    },
});

const featuredPlayListState = selectorFamily({
  key: "featuredPlayListState",
  get:
    ({ limit }) =>
    async () => {
      const [data, error] = await getFeaturedPlayList({
        country: "IN",
        locale: "en_IN",
        limit,
        timestamp: new Date().toISOString(),
      });
      if (error) throw error;
      return data;
    },
});

const newReleasesState = selectorFamily({
  key: "newReleasesState",
  get:
    ({ limit }) =>
    async () => {
      const [data, error] = await getNewReleases({
        country: "IN",
        limit,
      });
      if (error) throw error;
      return { message: "Popular new releases", ...data };
    },
});

export const recentlyPlayedState = atom({
  key: "recentlyPlayedState",
  default: null,
});

export const recentlyPlayedSelectorState = selectorFamily({
  key: "recentlyPlayedSelectorState",
  get: (size) => async () => {
    try {
      const resp = await musixAxios(musixToken()).get("/playItems/recently", {
        params: { size },
      });
      return resp.data;
    } catch (e) {
      throw e;
    }
  },
});

export const uPlaylistState = selector({
  key: "uPlaylistState",
  get: async () => {
    try {
      const resp = await musixAxios(musixToken()).get("/playItems/mixes");
      return resp.data;
    } catch (e) {
      throw e;
    }
  },
});
export const userMixesSelectorState = selector({
  key: "userMixesSelectorState",
  get: async ({ get }) => {
    try {
      const data1 = get(uPlaylistState);
      const foundIdx = data1?.rows.findIndex((ele) => !!ele.genres);
      let data2;
      if (foundIdx >= 0) {
        data2 = get(
          contentWrapperState({
            as: "category",
            property: data1.rows[foundIdx].genres.split(",")[0],
            limit: 6,
          })
        );
      }
      if (data2) return [data1, data2];
      else {
        if (!data1?.rows.length) return [];
        return [data1];
      }
    } catch (e) {
      throw e;
    }
  },
});

export const topPlayItemsSelectorState = selectorFamily({
  key: "topPlayItemsSelectorState",
  get: (size) => async () => {
    try {
      const resp = await musixAxios(musixToken()).get(
        "/playItems/topPlayItems",
        {
          params: { size },
        }
      );
      const data = resp.data;
      if (!data?.rows.length) return [];
      return [data];
    } catch (e) {
      throw e;
    }
  },
});
export const getRecommendState = selectorFamily({
  key: "getRecommendState",
  get: (params) => async () => {
    const [data, error] = await recommend({
      seed_artists: params.artistIds,
      seed_genres: params.genres,
      seed_tracks: params.trackIds,
      limit: params.limit,
      market: "IN",
    });
    if (error) throw error;
    return data;
  },
});

export const getTopArtistState = selector({
  key: "getTopArtistState",
  get: async () => {
    try {
      const resp = await musixAxios(musixToken()).get("/playItems/topArtists");
      return resp.data?.rows ?? [];
    } catch (e) {
      throw e;
    }
  },
});

export const getRecommendSelectorState = selectorFamily({
  key: "getRecommendSelectorState",
  get:
    ({ artist, size }) =>
    async ({ get }) => {
      return {
        as: "recommend",
        property: artist.id,
        message: `More like ${artist.name}`,
        rows:
          get(getRecommendState({ artistIds: artist.id, limit: size }))
            ?.tracks ?? [],
      };
    },
});

export const topArtistsSelectorState = selectorFamily({
  key: "topArtistsSelectorState",
  get:
    (size) =>
    async ({ get }) => {
      try {
        const artists = get(getTopArtistState);
        const data = artists.map((artist) =>
          get(getRecommendSelectorState({ artist, size }))
        );
        return data;
      } catch (e) {
        throw e;
      }
    },
});
