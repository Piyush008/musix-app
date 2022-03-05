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
import { FcLike } from "react-icons/fc";
import { GiSelfLove } from "react-icons/gi";
import { useLocation, useParams } from "react-router-dom";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import {
  albumPlaylistParamState,
  likedItemsState,
} from "../atoms/albumPlayList.atom.js";
import Track from "../components/track/Track.jsx";
import CustomSuspense from "../components/util/CustomSuspense";
import useLiked from "../hooks/useLiked.js";
import usePlayPauseClick from "../hooks/usePlayPauseClick.js";
import { albumPlayListDetailsSate } from "../selector/albumPlayList.selector.js";
import { musixToken } from "../utils/auth.utils.js";
import { musixAxios } from "../utils/axios.utils.js";
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
    else if (location.pathname.includes("collection"))
      setAlbumPlaylistParam({
        type: "collection",
        id: "tracks",
      });
    return () => {
      resetParam();
    };
  }, [location.pathname]);
  if (albumPlaylistParam?.type === ROUTER.PLAYLIST) return <PlayListPage />;
  else if (albumPlaylistParam?.type === ROUTER.ALBUM) return <AlbumPage />;
  else if (albumPlaylistParam?.type === "uPlaylist") return <PlayListPage />;
  else if (albumPlaylistParam?.type === "collection") return <PlayListPage />;
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
        <Flex
          direction={"column"}
          pl={pxToAll(20)}
          pr={["0", "0", pxToRem(20)]}
          overflow={"hidden"}
        >
          <AlbumPlaylistMiddleContent
            id={contents?.id}
            type={type}
            title={name}
            imageSource={imgUrl}
            details={{ description: desc }}
          />
          <Grid
            templateColumns={`25px minmax(170px, 2fr) minmax(85px, 1fr) 100px`}
            gridColumnGap={pxToAll(20)}
            height={pxToAll(40)}
            alignItems={"center"}
            px={pxToAll(20)}
          >
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"}>#</Text>
            </GridItem>
            <GridItem>
              <Text textStyle={"label"} letterSpacing={"widest"}>
                TITLE
              </Text>
            </GridItem>
            <GridItem>
              <Text textStyle={"label"} isTruncated letterSpacing={"widest"}>
                ALBUM
              </Text>
            </GridItem>
            <GridItem justifySelf={"end"} letterSpacing={"widest"}>
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
  const artists = contents?.artists ?? [];
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
        <Flex
          direction={"column"}
          pl={pxToAll(20)}
          pr={["0", "0", pxToRem(20)]}
          overflow={"hidden"}
        >
          <AlbumPlaylistMiddleContent
            id={contents?.id}
            type={type}
            title={name}
            details={{ description: desc, artists }}
          />
          <Grid
            templateColumns={"25px minmax(170px, 1fr) 100px"}
            gridColumnGap={pxToAll(20)}
            height={pxToAll(40)}
            alignItems={"center"}
            px={pxToAll(20)}
          >
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"} letterSpacing={"widest"}>
                #
              </Text>
            </GridItem>
            <GridItem>
              <Text textStyle={"label"} letterSpacing={"widest"}>
                TITLE
              </Text>
            </GridItem>
            <GridItem justifySelf={"end"}>
              <Text textStyle={"label"} letterSpacing={"widest"}>
                DURATION
              </Text>
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

function AlbumPlaylistMiddleContent({ id, type, title, imageSource, details }) {
  const [isPlaying, onPlayClick, onPauseClick] = usePlayPauseClick(id);
  const onLiked = useLiked();
  const likedItems = useRecoilValue(likedItemsState);
  const isLiked = !!likedItems[id] && likedItems[id] === type;
  const handleClick = () => {
    if (isPlaying) onPauseClick();
    else onPlayClick(type, title, imageSource, details);
  };

  return (
    <HStack spacing={pxToAll(20)} my={pxToAll(20)}>
      <IconButton
        size={"xl"}
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        onClick={handleClick}
      />
      <Icon
        as={isLiked ? FcLike : GiSelfLove}
        textStyle={"icon.lg"}
        _hover={{
          color: "text.secondary",
          transition: "all 0.25s",
        }}
        onClick={() => onLiked(id, type)}
      />
    </HStack>
  );
}
