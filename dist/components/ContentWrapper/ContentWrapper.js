import React from "../../../_snowpack/pkg/react.js";
import {Box, Flex, HStack, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {useNavigate} from "../../../_snowpack/pkg/react-router-dom.js";
import {selectorFamily} from "../../../_snowpack/pkg/recoil.js";
import useAgent from "../../hooks/useAgent.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {
  getAlbum,
  getCategoryDetails,
  getCategoryPlayList,
  getFeaturedPlayList,
  getNewReleases,
  getPlayListDetails
} from "../../utils/spotify.utils.js";
import {pxToAll} from "../../utils/theme.utils.js";
import CardRenderer from "../cardRenderrer/index.js";
import BigCard from "../cards/bigCard/index.js";
import CustomItem from "../util/CustomItem.js";
const categoryState = selectorFamily({
  key: "categoryState",
  get: ({property}) => async () => {
    const [data, error] = await getCategoryDetails(property, {
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
  get: ({property, limit}) => async () => {
    const [data, error] = await getCategoryPlayList(property, {
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
  get: ({limit}) => async () => {
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
  get: ({limit}) => async () => {
    const [data, error] = await getNewReleases({
      country: "IN",
      limit
    });
    if (error)
      throw error;
    return {message: "Popular new releases", ...data};
  }
});
export const contentWrapperState = selectorFamily({
  key: "contentWrapperState",
  get: (params) => ({get}) => {
    const {as, ...rest} = params;
    if (as == "category") {
      const catPlayListDetails = get(categoryPlayListState(rest));
      const catDetails = get(categoryState(rest));
      return {...catPlayListDetails, message: catDetails};
    } else if (as == "release") {
      return get(newReleasesState(rest));
    } else if (as == "featured") {
      return get(featuredPlayListState(rest));
    }
  }
});
const albumState = selectorFamily({
  key: "albumState",
  get: (id) => async () => {
    const [data, error] = await getAlbum(id, {market: "IN"});
    if (error)
      throw error;
    return data;
  }
});
const playlistState = selectorFamily({
  key: "playlistState",
  get: (id) => async () => {
    const [data, error] = await getPlayListDetails(id, {
      id,
      market: "IN",
      limit: 20
    });
    if (error)
      throw error;
    return data;
  }
});
export const albumPlayListDetailsSate = selectorFamily({
  key: "albumPlayListDetailsState",
  get: (params) => async ({get}) => {
    const {type, id} = params;
    if (type === "album")
      return get(albumState(id));
    else if (type === "playlist")
      return get(playlistState(id));
  }
});
export default function ContentWrapper(props) {
  const {as, property, autoRows, seeAll} = props;
  const items = props?.playlists?.items || props?.albums?.items || [];
  const title = props?.message?.name || props?.message || "";
  const navigate = useNavigate();
  const isMobile = useAgent();
  const showAllContent = () => {
    navigate(`${ROUTER.GENRE}/${property}`, {
      state: {as, property, limit: 20, urlFrom: ROUTER.HOME}
    });
  };
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    py: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(HStack, {
    justifyContent: "space-between"
  }, /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h5",
    color: "text.secondary"
  }, title)), seeAll && /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "card",
    onClick: () => showAllContent({as, property, limit: 20}),
    cursor: isMobile ? "auto" : "pointer"
  }, /* @__PURE__ */ React.createElement(Text, {
    fontWeight: "bold",
    textStyle: "p"
  }, "SEE ALL"))), /* @__PURE__ */ React.createElement(CardRenderer, {
    autoRows
  }, items.map(({id, ...rest}) => /* @__PURE__ */ React.createElement(BigCardWrapper, {
    ...rest,
    key: id,
    id
  }))));
}
function BigCardWrapper(props) {
  const navigate = useNavigate();
  const title = props?.name ?? "";
  const subtitle = props?.description || props?.artists?.[0]?.name || "";
  const imageSource = props?.images?.[0]?.url;
  const type = props?.type;
  const id = props?.id;
  const handleClick = () => {
    navigate(`/${type}/${id}`, {
      state: {
        type,
        id
      }
    });
  };
  return /* @__PURE__ */ React.createElement(BigCard, {
    imageBorderRadius: "10px",
    imageSource,
    title,
    subtitle,
    onClick: handleClick
  });
}
ContentWrapper.defaultProps = {
  autoRows: 0,
  seeAll: true
};
