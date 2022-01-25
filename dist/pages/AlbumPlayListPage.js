import React from "../../_snowpack/pkg/react.js";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Spinner,
  Text
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useLocation, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {
  atom,
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState
} from "../../_snowpack/pkg/recoil.js";
import {albumPlayListDetailsSate} from "../components/ContentWrapper/ContentWrapper.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import ROUTER from "../utils/constants/router.constants.js";
import {pxToAll, pxToRem, pxToRemSm} from "../utils/theme.utils.js";
export const albumPlaylistParamState = atom({
  key: "albumPlaylistParamState",
  default: null
});
export default function AlbumPlayListPage() {
  const location = useLocation();
  const params = useParams();
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(albumPlaylistParamState);
  const resetParam = useResetRecoilState(albumPlaylistParamState);
  React.useEffect(() => {
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
    return () => {
      resetParam();
    };
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
  const contents = albumPlayListLoadable?.contents;
  const tracks = contents?.tracks?.items ?? [];
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
  }), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    px: pxToAll(20),
    overflow: "hidden"
  }, /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: [
      `${pxToRemSm(25 / 1.5)} minmax(${pxToRemSm(375 / 1.5)}, 2fr) minmax(${pxToRemSm(100 / 1.5)}, 1fr) ${pxToRemSm(80 / 1.5)}`,
      null,
      `${pxToRem(25)} minmax(${pxToRem(300)}, 2fr) minmax(${pxToRem(100)}, 1fr) ${pxToRem(80)}`
    ],
    gridColumnGap: pxToAll(20),
    height: pxToAll(40),
    alignItems: "center",
    px: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(GridItem, {
    justifySelf: "end"
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "#")), /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "TITLE")), /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label",
    isTruncated: true
  }, "ALBUM")), /* @__PURE__ */ React.createElement(GridItem, {
    justifySelf: "end"
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "DURATION"))), /* @__PURE__ */ React.createElement(Divider, {
    orientation: "horizontal",
    colorScheme: "teal"
  }), tracks.map(({track: {id, ...rest}}, idx) => /* @__PURE__ */ React.createElement(Track, {
    ...rest,
    key: id,
    id,
    seq: idx + 1
  })))));
}
function AlbumPage() {
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(albumPlaylistParamState);
  const albumPlayListLoadable = useRecoilValueLoadable(albumPlayListDetailsSate(albumPlaylistParam));
  const contents = albumPlayListLoadable.contents;
  const tracks = contents?.tracks?.items ?? [];
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
  }), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    px: pxToAll(20),
    overflow: "hidden"
  }, /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: "25px minmax(300px, 2fr) 100px",
    gridColumnGap: pxToAll(20),
    height: pxToAll(40),
    alignItems: "center",
    px: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(GridItem, {
    justifySelf: "end"
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "#")), /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "TITLE")), /* @__PURE__ */ React.createElement(GridItem, {
    justifySelf: "end"
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "DURATION"))), /* @__PURE__ */ React.createElement(Divider, {
    orientation: "horizontal",
    colorScheme: "teal"
  }), tracks.map(({id, ...rest}, idx) => /* @__PURE__ */ React.createElement(Track, {
    ...rest,
    key: id,
    id,
    seq: idx + 1
  })))));
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
function Track(props) {
  const artists = props?.artists ?? [];
  const album = props?.album;
  const imageUrl = album?.images[0]?.url;
  const artistName = artists.map((artist) => artist.name);
  return /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: album ? [
      `${pxToRemSm(25 / 1.5)} minmax(${pxToRemSm(375 / 1.5)}, 2fr) minmax(${pxToRemSm(100 / 1.5)}, 1fr) ${pxToRemSm(80 / 1.5)}`,
      null,
      `${pxToRem(25)} minmax(${pxToRem(300)}, 2fr) minmax(${pxToRem(100)}, 1fr) ${pxToRem(80)}`
    ] : "25px minmax(300px, 2fr) 100px",
    gridColumnGap: pxToAll(20),
    height: pxToAll(60),
    mt: pxToAll(10),
    alignItems: "center",
    px: pxToAll(20),
    transition: "all 0.25s",
    _active: {
      bg: "brand.primary",
      borderRadius: "10px",
      transition: "all 0.25s"
    }
  }, /* @__PURE__ */ React.createElement(GridItem, {
    justifySelf: "end"
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h6"
  }, props.seq)), /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(HStack, null, imageUrl && /* @__PURE__ */ React.createElement(Box, {
    width: pxToAll(50)
  }, /* @__PURE__ */ React.createElement(Image, {
    src: imageUrl
  })), /* @__PURE__ */ React.createElement(Box, {
    width: [
      `calc(100% - ${pxToRemSm(50 / 1.5)} - 0.5rem)`,
      null,
      `calc(100% - ${pxToRem(50)} - 0.5rem)`
    ]
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h6",
    color: "text.secondary",
    isTruncated: true
  }, props.name), /* @__PURE__ */ React.createElement(Text, {
    textStyle: "p",
    isTruncated: true
  }, artistName.join())))), album && /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label",
    isTruncated: true
  }, album?.name)), /* @__PURE__ */ React.createElement(GridItem, {
    justifySelf: "end"
  }, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, props?.duration_ms)));
}
