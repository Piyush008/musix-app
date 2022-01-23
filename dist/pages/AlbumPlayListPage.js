import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Image, Spinner, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useLocation, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {atom, useRecoilState, useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import {albumPlayListDetailsSate} from "../components/ContentWrapper/ContentWrapper.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import ROUTER from "../utils/constants/router.constants.js";
import {pxToAll, pxToRem, pxToRemSm} from "../utils/theme.utils.js";
const albumPlaylistParamState = atom({
  key: "albumPlaylistParamState",
  default: {}
});
export default function AlbumPlayListPage() {
  const location = useLocation();
  const params = useParams();
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(albumPlaylistParamState);
  React.useEffect(() => {
    if (location.state) {
      setAlbumPlaylistParam(location.state);
    } else {
      if (location.pathname.includes(`${ROUTER.PLAYLIST}`))
        setAlbumPlaylistParam({
          type: ROUTER.PLAYLIST,
          id: params["playlistId"]
        });
      else if (location.pathname.includes(`${ROUTER.ALBUM}`))
        setAlbumPlaylistParam({
          type: ROUTER.ALBUM,
          id: params["albumId"]
        });
    }
  }, []);
  if (albumPlaylistParam?.type === "playlist")
    return /* @__PURE__ */ React.createElement(PlayListPage, null);
  else if (albumPlaylistParam?.type === "album")
    return /* @__PURE__ */ React.createElement(AlbumPage, null);
  return null;
}
function PlayListPage() {
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(albumPlaylistParamState);
  const albumPlayListLoadable = useRecoilValueLoadable(albumPlayListDetailsSate(albumPlaylistParam));
  const contents = albumPlayListLoadable.contents;
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    state: albumPlayListLoadable.state,
    fallback: /* @__PURE__ */ React.createElement(Box, {
      children: /* @__PURE__ */ React.createElement(Spinner, null),
      pos: "relative",
      top: "30%",
      textAlign: "center",
      height: "100%"
    })
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    pos: "relative",
    top: pxToAll(-80)
  }, /* @__PURE__ */ React.createElement(AlbumPlaylistHeaderContent, {
    url: contents?.images?.[0]?.url,
    type: contents?.type,
    name: contents?.name,
    desc: contents?.description
  })));
}
function AlbumPage() {
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(albumPlaylistParamState);
  const albumPlayListLoadable = useRecoilValueLoadable(albumPlayListDetailsSate(albumPlaylistParam));
  const contents = albumPlayListLoadable.contents;
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    state: albumPlayListLoadable.state,
    fallback: /* @__PURE__ */ React.createElement(Box, {
      children: /* @__PURE__ */ React.createElement(Spinner, null),
      pos: "relative",
      top: "30%",
      textAlign: "center",
      height: "100%"
    })
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    pos: "relative",
    top: pxToAll(-80)
  }, /* @__PURE__ */ React.createElement(AlbumPlaylistHeaderContent, {
    url: contents?.images?.[0]?.url,
    type: contents?.type,
    name: contents?.name,
    desc: ""
  })));
}
function AlbumPlaylistHeaderContent({url, type, name, desc}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
    bgImage: url,
    bgSize: "cover",
    bgPos: ["center"],
    height: [pxToRemSm(170), null, pxToRem(380)],
    width: "100%",
    opacity: "0.5"
  }), /* @__PURE__ */ React.createElement(Flex, {
    p: pxToAll(20),
    width: "100%",
    position: "absolute",
    top: pxToAll(80),
    direction: "column",
    justifyContent: "flex-end",
    height: [
      `calc(${pxToRemSm(170)} - ${pxToRemSm(53.3)})`,
      null,
      `calc(${pxToRem(380)} - ${pxToRem(80)})`
    ]
  }, /* @__PURE__ */ React.createElement(Text, {
    textTransform: "uppercase",
    textStyle: "h6",
    color: "text.secondary",
    fontWeight: "bold"
  }, type), /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h2",
    color: "text.secondary",
    lineHeight: "1.25",
    isTruncated: true
  }, name), /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h6",
    isTruncated: true
  }, desc)));
}
