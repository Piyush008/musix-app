import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import { albumPlayListDetailsSate } from "../components/ContentWrapper/ContentWrapper";
import CustomSuspense from "../components/util/CustomSuspense";
import ROUTER from "../utils/constants/router.constants.js";
import { pxToAll, pxToRem, pxToRemSm } from "../utils/theme.utils.js";
export const albumPlaylistParamState = atom({
  key: "albumPlaylistParamState",
  default: null,
});

export default function AlbumPlayListPage() {
  const location = useLocation();
  const params = useParams();
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(
    albumPlaylistParamState
  );
  const resetParam = useResetRecoilState(albumPlaylistParamState);
  React.useEffect(() => {
    if (!albumPlaylistParam) {
      if (location.pathname.includes(`${ROUTER.PLAYLIST}`))
        setAlbumPlaylistParam({
          type: ROUTER.PLAYLIST,
          id: params["playlistId"],
        });
      else if (location.pathname.includes(`${ROUTER.ALBUM}`))
        setAlbumPlaylistParam({
          type: ROUTER.ALBUM,
          id: params["albumId"],
        });
    }
    return () => {
      resetParam();
    };
  }, []);
  if (albumPlaylistParam?.type === "playlist") return <PlayListPage />;
  else if (albumPlaylistParam?.type === "album") return <AlbumPage />;
  return null;
}

function PlayListPage() {
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(
    albumPlaylistParamState
  );
  const albumPlayListLoadable = useRecoilValueLoadable(
    albumPlayListDetailsSate(albumPlaylistParam)
  );
  const contents = albumPlayListLoadable.contents;
  return (
    <CustomSuspense
      state={albumPlayListLoadable.state}
      fallback={
        <Box
          children={<Spinner />}
          pos={"relative"}
          top={"30%"}
          textAlign={"center"}
          height={"100%"}
        />
      }
    >
      <Flex direction={"column"} pos={"relative"} top={pxToAll(-80)}>
        <AlbumPlaylistHeaderContent
          url={contents?.images?.[0]?.url}
          type={contents?.type}
          name={contents?.name}
          desc={contents?.description}
        />
      </Flex>
    </CustomSuspense>
  );
}

function AlbumPage() {
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(
    albumPlaylistParamState
  );
  const albumPlayListLoadable = useRecoilValueLoadable(
    albumPlayListDetailsSate(albumPlaylistParam)
  );
  const contents = albumPlayListLoadable.contents;
  return (
    <CustomSuspense
      state={albumPlayListLoadable.state}
      fallback={
        <Box
          children={<Spinner />}
          pos={"relative"}
          top={"30%"}
          textAlign={"center"}
          height={"100%"}
        />
      }
    >
      <Flex direction={"column"} pos={"relative"} top={pxToAll(-80)}>
        <AlbumPlaylistHeaderContent
          url={contents?.images?.[0]?.url}
          type={contents?.type}
          name={contents?.name}
          desc={""}
        />
      </Flex>
    </CustomSuspense>
  );
}

function AlbumPlaylistHeaderContent({ url, type, name, desc }) {
  return (
    <React.Fragment>
      <Box
        bgImage={url}
        bgSize={"cover"}
        bgPos={["center"]}
        height={[pxToRemSm(170), null, pxToRem(380)]}
        width={"100%"}
        opacity={"0.5"}
      />
      <Flex
        p={pxToAll(20)}
        width={"100%"}
        position={"absolute"}
        top={pxToAll(80)}
        direction={"column"}
        justifyContent={"flex-end"}
        height={[
          `calc(${pxToRemSm(170)} - ${pxToRemSm(53.3)})`,
          null,
          `calc(${pxToRem(380)} - ${pxToRem(80)})`,
        ]}
      >
        <Text
          textTransform={"uppercase"}
          textStyle={"h6"}
          color={"text.secondary"}
          fontWeight={"bold"}
        >
          {type}
        </Text>
        <Text
          textStyle={"h2"}
          color={"text.secondary"}
          lineHeight={"1.25"}
          isTruncated
        >
          {name}
        </Text>
        <Text textStyle={"h6"} isTruncated>
          {desc}
        </Text>
      </Flex>
    </React.Fragment>
  );
}
