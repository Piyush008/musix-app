import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { GiSelfLove } from "react-icons/gi";
import { useLocation, useParams } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import {
  albumPlaylistParamState,
  albumPlayListTrackState,
} from "../atoms/albumPlayList.atom.js";
import Track from "../components/track/Track.jsx";
import CustomSuspense from "../components/util/CustomSuspense";
import { albumPlayListDetailsSate } from "../selector/albumPlayList.selector.js";
import ROUTER from "../utils/constants/router.constants.js";
import { pxToAll, pxToRem, pxToRemSm } from "../utils/theme.utils.js";

export default function AlbumPlayListPage() {
  const location = useLocation();
  const params = useParams();
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(
    albumPlaylistParamState
  );
  const resetParam = useResetRecoilState(albumPlaylistParamState);
  React.useEffect(() => {
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
    else if (location.pathname.includes("uPlaylist"))
      setAlbumPlaylistParam({
        type: "uPlaylist",
        id: params["playlistId"],
      });
    return () => {
      resetParam();
    };
  }, []);
  if (albumPlaylistParam?.type === ROUTER.PLAYLIST) return <PlayListPage />;
  else if (albumPlaylistParam?.type === ROUTER.ALBUM) return <AlbumPage />;
  else if (albumPlaylistParam?.type === "uPlaylist") return <PlayListPage />;
  return null;
}

function PlayListPage() {
  const [albumPlaylistParam, setAlbumPlaylistParam] = useRecoilState(
    albumPlaylistParamState
  );
  const albumPlayListLoadable = useRecoilValueLoadable(
    albumPlayListDetailsSate(albumPlaylistParam)
  );
  const contents = albumPlayListLoadable?.contents;
  const imgUrl = contents?.images?.[0]?.url || contents?.imgUrl;
  const type = contents?.type;
  const name = contents?.name;
  const desc = contents?.description;
  let filteredTracks = contents?.tracks?.items || contents?.tracks || [];
  if (type === ROUTER.PLAYLIST)
    filteredTracks = filteredTracks.filter((content) => !!content.track);
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
          url={imgUrl}
          type={type}
          name={name}
          desc={desc}
        />
        <Flex direction={"column"} px={pxToAll(20)} overflow={"hidden"}>
          <AlbumPlaylistMiddleContent id={contents?.id} />
          <Grid
            templateColumns={[
              `${pxToRemSm(25 / 1.5)} minmax(${pxToRemSm(
                375 / 1.5
              )}, 2fr) minmax(${pxToRemSm(100 / 1.5)}, 1fr) ${pxToRemSm(
                80 / 1.5
              )}`,
              null,
              `${pxToRem(25)} minmax(${pxToRem(300)}, 2fr) minmax(${pxToRem(
                100
              )}, 1fr) ${pxToRem(80)}`,
            ]}
            gridColumnGap={pxToAll(20)}
            height={pxToAll(40)}
            alignItems={"center"}
            px={pxToAll(20)}
          >
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"}>#</Text>
            </GridItem>
            <GridItem>
              <Text textStyle={"label"}>TITLE</Text>
            </GridItem>
            <GridItem>
              <Text textStyle={"label"} isTruncated>
                ALBUM
              </Text>
            </GridItem>
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"}>DURATION</Text>
            </GridItem>
          </Grid>
          <Divider orientation="horizontal" colorScheme={"teal"} />
          {filteredTracks.map((props, idx) => {
            const track = props?.track || props;
            const { id, ...rest } = track;
            return (
              <Track
                {...rest}
                key={id}
                id={id}
                seq={idx + 1}
                header={{ id: contents?.id, name, desc, type, imgUrl }}
              />
            );
          })}
        </Flex>
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
  const imgUrl = contents?.images?.[0]?.url;
  const type = contents?.type;
  const name = contents?.name;
  const desc = "";
  const tracks = contents?.tracks?.items ?? [];
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
          url={imgUrl}
          type={type}
          name={name}
          desc={desc}
        />
        <Flex direction={"column"} px={pxToAll(20)} overflow={"hidden"}>
          <AlbumPlaylistMiddleContent id={contents?.id} />
          <Grid
            templateColumns={"25px minmax(300px, 2fr) 100px"}
            gridColumnGap={pxToAll(20)}
            height={pxToAll(40)}
            alignItems={"center"}
            px={pxToAll(20)}
          >
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"}>#</Text>
            </GridItem>
            <GridItem>
              <Text textStyle={"label"}>TITLE</Text>
            </GridItem>
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"}>DURATION</Text>
            </GridItem>
          </Grid>
          <Divider orientation="horizontal" colorScheme={"teal"} />
          {tracks.map(({ id, ...rest }, idx) => (
            <Track
              {...rest}
              key={id}
              id={id}
              seq={idx + 1}
              header={{ id: contents?.id, name, desc, type, imgUrl }}
            />
          ))}
        </Flex>
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
      />
      <Box
        bgGradient={
          "linear(to-t, blackAlpha.700 10%,blackAlpha.600 30%, transparent 100%)"
        }
        height={[
          `calc(${pxToRemSm(170)} - ${pxToRemSm(53.3)})`,
          null,
          `calc(${pxToRem(380)} - ${pxToRem(80)})`,
        ]}
        width={"100%"}
        zIndex={1}
        pos={"absolute"}
        top={pxToAll(80)}
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
        zIndex={2}
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
        <Text textStyle={"label"} isTruncated>
          {desc}
        </Text>
      </Flex>
    </React.Fragment>
  );
}

function AlbumPlaylistMiddleContent({ id }) {
  const albumPlayListTrack = useRecoilValue(albumPlayListTrackState);
  const isPlaying =
    !!albumPlayListTrack?.isPlaying && albumPlayListTrack?.id === id;
  const isLiked = false;
  return (
    <HStack spacing={pxToAll(20)} my={pxToAll(20)}>
      <IconButton size={"xl"} icon={isPlaying ? <FaPause /> : <FaPlay />} />
      <Icon
        as={true ? GiSelfLove : FcLike}
        textStyle={"icon.lg"}
        _hover={{
          color: "text.secondary",
          transition: "all 0.25s",
        }}
      />
    </HStack>
  );
}
