import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { albumPlaylistParamState } from "../atoms/albumPlayList.atom.js";
import CustomSuspense from "../components/util/CustomSuspense";
import {
  albumPlayListDetailsSate,
  albumPlayListSelectorTrackState,
} from "../selector/albumPlayList.selector.js";
import ROUTER from "../utils/constants/router.constants.js";
import {
  searchTrackTemplate,
  secondsToMins,
} from "../utils/conversion.utils.js";
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
  const contents = albumPlayListLoadable?.contents;
  const tracks = contents?.tracks?.items ?? [];
  const filteredTracks = tracks.filter((content) => !!content.track);
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
        <Flex direction={"column"} px={pxToAll(20)} overflow={"hidden"}>
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
          {filteredTracks.map(({ track: { id, ...rest } }, idx) => (
            <Track {...rest} key={id} id={id} seq={idx + 1} />
          ))}
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
          url={contents?.images?.[0]?.url}
          type={contents?.type}
          name={contents?.name}
          desc={""}
        />
        <Flex direction={"column"} px={pxToAll(20)} overflow={"hidden"}>
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
              album={{ id: contents?.id }}
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

export function Track(props) {
  const artists = props?.artists ?? [];
  const album = props?.album;
  const imageUrl = album?.images?.[0]?.url;
  const artistName = artists.map((artist) => artist.name);
  // const setAlbumPlayListSelectorTrack = useSetRecoilState(
  //   albumPlayListSelectorTrackState
  // );
  const handleClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async (albumId, trackName, artistName, trackId, view) => {
        const albumPlayListParam = snapshot.getLoadable(
          albumPlaylistParamState
        );
        if (
          albumPlayListParam.contents?.id !== albumId &&
          view === ROUTER.SEARCH
        ) {
          set(albumPlaylistParamState, { type: ROUTER.ALBUM, id: albumId });
          try {
            await snapshot.getPromise(
              albumPlayListDetailsSate({ type: ROUTER.ALBUM, id: albumId })
            );
            set(albumPlayListSelectorTrackState, {
              id: trackId,
              searchTrack: searchTrackTemplate(trackName, artistName),
            });
          } catch (e) {
            console.log(e);
          }
        } else
          set(albumPlayListSelectorTrackState, {
            id: trackId,
            searchTrack: searchTrackTemplate(trackName, artistName),
          });
      },
    []
  );

  return (
    <Grid
      templateColumns={
        album
          ? [
              `${pxToRemSm(25 / 1.5)} minmax(${pxToRemSm(
                375 / 1.5
              )}, 2fr) minmax(${pxToRemSm(100 / 1.5)}, 1fr) ${pxToRemSm(
                80 / 1.5
              )}`,
              null,
              `${pxToRem(25)} minmax(${pxToRem(300)}, 2fr) minmax(${pxToRem(
                100
              )}, 1fr) ${pxToRem(80)}`,
            ]
          : "25px minmax(300px, 2fr) 100px"
      }
      gridColumnGap={pxToAll(20)}
      height={pxToAll(70)}
      mt={pxToAll(10)}
      alignItems={"center"}
      px={pxToAll(20)}
      transition="all 0.25s"
      _hover={{
        bg: "shade.primary",
        borderRadius: "10px",
        transition: "all 0.25s",
      }}
      onClick={() =>
        handleClick(album.id, props.name, artistName[0], props.id, props.view)
      }
    >
      <GridItem justifySelf={"end"}>
        <Text textStyle={"h6"}>{props.seq}</Text>
      </GridItem>
      <GridItem>
        <HStack>
          {imageUrl && (
            <Box width={pxToAll(60)}>
              <Image src={imageUrl} />
            </Box>
          )}
          <Box
            width={[
              `calc(100% - ${pxToRemSm(60 / 1.5)} - 0.5rem)`,
              null,
              `calc(100% - ${pxToRem(60)} - 0.5rem)`,
            ]}
          >
            <Text
              textStyle={"h6"}
              color={"text.secondary"}
              isTruncated
              fontWeight={"normal"}
            >
              {props.name}
            </Text>
            <Text textStyle={"label"} isTruncated>
              {artistName.join(", ")}
            </Text>
          </Box>
        </HStack>
      </GridItem>
      {album?.name && (
        <GridItem>
          <Text textStyle={"label"} isTruncated>
            {album?.name}
          </Text>
        </GridItem>
      )}
      <GridItem justifySelf={"end"}>
        <Text textStyle={"label"}>
          {secondsToMins(props?.duration_ms / 1000)}
        </Text>
      </GridItem>
    </Grid>
  );
}

Track.defaultProps = {
  view: "NOT_SEARCH_VIEW",
};
