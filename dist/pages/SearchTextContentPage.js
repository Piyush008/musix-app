import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, GridItem, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import CardRenderer from "../components/cardRenderrer/index.js";
import ContentWrapper, {
  BigCardWrapper
} from "../components/ContentWrapper/ContentWrapper.js";
import {searchDetailsState} from "../components/Input/SearchInput.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import {pxToAll} from "../utils/theme.utils.js";
import {Track} from "./AlbumPlayListPage.js";
export default function SearchTextContentPage() {
  const searchText = useParams()?.searchText.trim() ?? "";
  const [topResult, setTopResult] = React.useState(null);
  const searchDetailsLoadable = useRecoilValueLoadable(searchDetailsState(searchText));
  const contents = searchDetailsLoadable.contents;
  const tracks = contents?.tracks?.items ?? [];
  const albums = contents?.albums;
  const playlists = contents?.playlists;
  const artists = contents?.artists;
  useEffect(() => {
    if (searchDetailsLoadable.state === "hasValue") {
      const artistTrackItems = [...artists?.items, ...tracks];
      const allItems = [
        ...artistTrackItems,
        ...albums?.items,
        ...playlists?.items
      ];
      let matchedItem = allItems.find((item) => item.name.toLowerCase() === searchText.toLowerCase());
      if (!matchedItem) {
        const popularityArr = artistTrackItems.map((item) => item.popularity);
        const idx = popularityArr.findIndex((item) => item.popularity === Math.max(popularityArr));
        matchedItem = artistTrackItems[idx];
      }
      setTopResult(matchedItem);
    }
  }, [searchDetailsLoadable.state]);
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    state: searchDetailsLoadable.state,
    fallback: /* @__PURE__ */ React.createElement(Box, null)
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "column"
  }, /* @__PURE__ */ React.createElement(CardRenderer, {
    autoRows: true,
    minCardWidth: "380",
    noOfChildren: "auto-fit",
    overflowX: "hidden"
  }, /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h5",
    color: "text.secondary"
  }, "Top Result"), /* @__PURE__ */ React.createElement(BigCardWrapper, {
    ...topResult,
    width: pxToAll(170)
  })), /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h5",
    color: "text.secondary"
  }, "Songs"), tracks.map(({id, ...rest}, idx) => /* @__PURE__ */ React.createElement(Track, {
    ...rest,
    key: id,
    id,
    seq: idx + 1
  })))), /* @__PURE__ */ React.createElement(ContentWrapper, {
    albums,
    message: "Albums",
    seeAll: false
  }), /* @__PURE__ */ React.createElement(ContentWrapper, {
    playlists,
    message: "Playlists",
    seeAll: false
  })));
}
