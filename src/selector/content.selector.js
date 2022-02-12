import { selector, selectorFamily } from "recoil";
import { showContentConversionUtil } from "../utils/conversion.utils.js";
import {
  getCategoryDetails,
  getCategoryPlayList,
  getFeaturedPlayList,
  getNewReleases,
} from "../utils/spotify.utils.js";
export const showContentState = selector({
  key: "showContentState",
  get: ({ get }) => {
    const metaData = showContentConversionUtil();
    const data = metaData.map((content) => ({
      ...content,
      ...get(contentWrapperState({ ...content, limit: 6 })),
    }));
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
