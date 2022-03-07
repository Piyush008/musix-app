import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { GiSelfLove } from "react-icons/gi";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import {
  albumPlayListTrackState,
  likedItemsState,
} from "../../atoms/albumPlayList.atom.js";
import { authState } from "../../atoms/auth.atoms.js";
import useCustomToast from "../../hooks/useCustomToast.js";
import useLiked from "../../hooks/useLiked.js";
import usePlayPauseClick from "../../hooks/usePlayPauseClick.js";
import {
  albumPlayListDetailsSate,
  albumPlayListSelectorTrackState,
} from "../../selector/albumPlayList.selector.js";
import { musixToken } from "../../utils/auth.utils.js";
import { musixAxios } from "../../utils/axios.utils.js";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import {
  getNewStateForPlayPause,
  searchTrackTemplate,
  secondsToMins,
} from "../../utils/conversion.utils.js";
import { pxToAll, pxToRem, pxToRemSm } from "../../utils/theme.utils.js";

export default function Track(props) {
  const [isAlbumPlayListPlaying, isAlbumPlayListLoading, , onPauseClick] =
    usePlayPauseClick(props.header.id);
  const setAlbumPlayListTrack = useSetRecoilState(albumPlayListTrackState);
  const albumPlayListSelectorTrack = useRecoilValue(
    albumPlayListSelectorTrackState
  );
  const auth = useRecoilValue(authState);
  const toast = useCustomToast();
  const onLiked = useLiked();
  const likedItems = useRecoilValue(likedItemsState);
  const [isEnter, setEnter] = React.useState(false);
  const currentItem = albumPlayListSelectorTrack?.currentItem;
  const idx = albumPlayListSelectorTrack?.idx;
  const totalLength = albumPlayListSelectorTrack?.totalLength;
  const isCurrentItem = currentItem?.itemId === props.id;
  const isPlaying =
    isCurrentItem && currentItem?.isPlaying === PLAYMODE.PLAYING;
  const artists = props?.artists ?? [];
  const album = props?.album;
  const imageUrl = props?.imgUrl || album?.images?.[0]?.url;
  const artistName = artists.map((artist) => artist.name);
  const isLiked =
    !!likedItems?.[props?.id] && likedItems?.[props?.id] === "track";
  const handlePlayCallback = useRecoilCallback(
    ({ snapshot, set }) =>
      async (header, artists, trackName, artistName, trackId, obj) => {
        const albumPlayListTrack = snapshot.getLoadable(
          albumPlayListTrackState
        );
        const release = snapshot.retain();
        try {
          const { type, id, name, desc, imgUrl } = header;
          if (albumPlayListTrack.contents?.id !== id) {
            const resp = await musixAxios(musixToken()).put("/playItems/", {
              type,
              spotifyId: id,
              name,
              description: desc,
              imgUrl,
              artists,
            });
            if (!(resp.status >= 400)) {
              await snapshot.getPromise(albumPlayListDetailsSate({ type, id }));
              set(albumPlayListSelectorTrackState, {
                id: trackId,
                searchTrack: searchTrackTemplate(trackName, artistName),
                type,
                albumPlayListId: id,
              });
            }
          } else {
            if (obj.isCurrentItem) {
              let currentIdx = obj.idx - 1;
              if (idx == 0) currentIdx = obj.totalLength - 1;
              setAlbumPlayListTrack((prevState) =>
                getNewStateForPlayPause(prevState, PLAYMODE.PLAYING, currentIdx)
              );
            } else
              set(albumPlayListSelectorTrackState, {
                id: trackId,
                searchTrack: searchTrackTemplate(trackName, artistName),
                type,
                albumPlayListId: id,
              });
          }
        } catch (e) {
          console.log(e);
        } finally {
          release();
        }
      },
    []
  );

  const handleClick = () => {
    if (auth.isAuth) {
      if (!isAlbumPlayListLoading) {
        if (isPlaying && isAlbumPlayListPlaying) onPauseClick();
        else
          handlePlayCallback(
            props.header,
            artists,
            props.name,
            artistName[0],
            props.id,
            { isCurrentItem, idx, totalLength }
          );
      }
    } else toast();
  };
  return (
    <Grid
      templateColumns={
        imageUrl
          ? `25px minmax(170px, 2fr) minmax(85px, 1fr) 100px`
          : "25px minmax(170px, 1fr) 100px"
      }
      gridColumnGap={pxToAll(20)}
      height={pxToAll(70)}
      mt={pxToAll(10)}
      alignItems={"center"}
      px={pxToAll(20)}
      transition="all 0.25s"
      _hover={{
        bg: "shade.hoverPrimary",
        color: "text.secondary",
        borderRadius: "10px",
        transition: "all 0.25s",
      }}
      onClick={handleClick}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
    >
      <GridItem justifySelf={"end"}>
        {isEnter ? (
          <Icon
            as={isPlaying ? FaPause : FaPlay}
            textStyle={"icon.md"}
            _hover={{
              color: "text.play",
              transition: "all 0.25s",
            }}
          />
        ) : (
          <Text textStyle={"h6"}>{props.seq}</Text>
        )}
      </GridItem>
      <GridItem>
        <HStack>
          {imageUrl && (
            <Box width={pxToAll(60)} zIndex="-1">
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
              color={!isCurrentItem ? "text.secondary" : "text.play"}
              isTruncated
            >
              {props.name}
            </Text>
            <Text textStyle={"label"} isTruncated>
              {artistName.join(", ")}
            </Text>
          </Box>
        </HStack>
      </GridItem>
      {imageUrl && (
        <GridItem>
          <Text textStyle={"label"} isTruncated>
            {album?.name}
          </Text>
        </GridItem>
      )}
      <GridItem
        justifySelf={"end"}
        columnGap={pxToRem(40)}
        height={"100%"}
        alignItems="center"
        d={"flex"}
      >
        {isEnter && (
          <Icon
            as={isLiked ? FcLike : GiSelfLove}
            textStyle={"icon.md"}
            _hover={{
              color: "text.play",
              transition: "all 0.25s",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (auth.isAuth) onLiked(props.id, "track");
              else toast();
            }}
          />
        )}
        <Text textStyle={"label"}>
          {secondsToMins(props?.duration_ms / 1000)}
        </Text>
      </GridItem>
    </Grid>
  );
}
