import React from "../../../_snowpack/pkg/react.js";
import {Box, Flex, HStack, Spinner, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {selector, selectorFamily, useRecoilValueLoadable} from "../../../_snowpack/pkg/recoil.js";
import {
  getCategoryDetails,
  getCategoryPlayList,
  getFeaturedPlayList,
  getNewReleases
} from "../../utils/spotify.utils.js";
import {pxToAll} from "../../utils/theme.utils.js";
import CardRenderer from "../cardRenderrer/index.js";
import BigCard from "../cards/bigCard/index.js";
import CustomItem from "../util/CustomItem.js";
import CustomSuspense from "../util/CustomSuspense.js";
const categoryState = selectorFamily({
  key: "categoryState",
  get: (id) => async () => {
    const [data, error] = await getCategoryDetails(id, {
      country: "IN",
      locale: "en_IN"
    });
    if (error)
      throw error;
    return data;
  }
});
const categoryPlayListState = selectorFamily({
  key: "categoryPlayListState",
  get: (id, limit = 5) => async () => {
    const [data, error] = await getCategoryPlayList(id, {
      country: "IN",
      limit
    });
    if (error)
      throw error;
    return data;
  }
});
const featuredPlayListState = selectorFamily({
  key: "featuredPlayListState",
  get: (limit = 5) => async () => {
    const [data, error] = await getFeaturedPlayList({
      country: "IN",
      locale: "en_IN",
      limit,
      timestamp: new Date().toISOString()
    });
    if (error)
      throw error;
    return data;
  }
});
const newReleasesState = selectorFamily({
  key: "newReleasesState",
  get: (limit = 5) => async () => {
    const [data, error] = await getNewReleases({
      country: "IN",
      limit
    });
    if (error)
      throw error;
    return data;
  }
});
const contentWrapperState = selectorFamily({
  key: "contentWrapperState",
  get: (params) => async ({get}) => {
    const {as, property} = params;
    if (as == "category") {
      const catPlayListDetails = get(categoryPlayListState(property));
      const catDetails = get(categoryState(property));
      return {...catPlayListDetails, message: catDetails};
    } else if (as == "release") {
      return get(newReleasesState());
    } else if (as == "featured") {
      return get(featuredPlayListState());
    }
  }
});
export default function ContentWrapper(props) {
  const contentWrapperLoadable = useRecoilValueLoadable(contentWrapperState(props));
  const contentWrapper = contentWrapperLoadable.contents;
  const items = contentWrapper?.playlists?.items || contentWrapper?.albums?.items || [];
  const title = contentWrapper?.message?.name || contentWrapper?.message || "Popular new Releases";
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    fallback: /* @__PURE__ */ React.createElement(Box, null),
    state: contentWrapperLoadable.state
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    mb: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(HStack, {
    justifyContent: "space-between"
  }, /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h4",
    color: "text.secondary"
  }, title)), /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "card"
  }, /* @__PURE__ */ React.createElement(Text, {
    fontWeight: "bold",
    textStyle: "p",
    color: "text.disabled"
  }, "SEE ALL"))), /* @__PURE__ */ React.createElement(CardRenderer, null, items.map(({id, ...rest}) => /* @__PURE__ */ React.createElement(BigCardWrapper, {
    ...rest,
    key: id
  })))));
}
function BigCardWrapper(props) {
  const title = props?.name;
  const subtitle = props?.description || props?.artists[0]?.name;
  const imageSource = props?.images[0].url;
  return /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: "10px",
    imageSource,
    title,
    subtitle
  });
}
