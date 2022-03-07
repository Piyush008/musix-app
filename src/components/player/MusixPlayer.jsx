import { Box, HStack, Icon, Image, Text } from "@chakra-ui/react";
import useAgent from "../../hooks/useAgent.js";
import { pxToAll, pxToRemSm } from "../../utils/theme.utils.js";
import { FcLike } from "react-icons/fc";
import { GiSelfLove } from "react-icons/gi";
import {
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { musixToken, youtubeSearch } from "../../utils/auth.utils.js";
import { musixAxios } from "../../utils/axios.utils.js";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import { authState } from "../../atoms/auth.atoms.js";
import { getNewStateForPlayPause } from "../../utils/conversion.utils.js";
import { albumPlayListSelectorTrackState } from "../../selector/albumPlayList.selector.js";
import {
  albumPlayListTrackState,
  likedItemsState,
  searchTrackState,
} from "../../atoms/albumPlayList.atom.js";
import useLiked from "../../hooks/useLiked.js";
import AgentDetect from "../util/AgentDetect.jsx";
import MobileMusixPlayer from "./MobileMusixPlayer.jsx";
import DesktopMusixPlayer from "./DesktopMusixPlayer.jsx";

const init = {
  track: null,
  totalDuration: 0,
  currentTime: 0,
  isEnded: false,
  isSliding: false,
};

const audioTrackState = selector({
  key: "audioTrackState",
  get: async ({ get }) => {
    const auth = get(authState);
    let search = get(searchTrackState);
    if (auth.isAuth && search) {
      search = encodeURIComponent(search);
      try {
        const resp = await musixAxios(musixToken()).get(
          `/youtubeSearch/${search}`
        );
        if (resp.status === 200) {
          return resp.data?.value;
        }
      } catch (e) {
        const [data, error] = await youtubeSearch(search);
        if (error) throw error;
        try {
          await musixAxios(musixToken()).post("/youtubeSearch/", {
            searchName: decodeURIComponent(search),
            ...data,
          });
        } catch (e2) {}
        return data;
      }
    } else {
      return init;
    }
  },
});

export default function MusixPlayer() {
  const player = React.useRef();
  const audioTrackLoadable = useRecoilValueLoadable(audioTrackState);
  const audioTrackRefresh = useRecoilRefresher_UNSTABLE(audioTrackState);
  const [searchTrack, setSearchTrack] = useRecoilState(searchTrackState);
  const albumPlayListSelectorTrack = useRecoilValue(
    albumPlayListSelectorTrackState
  );
  const [albumPlayListTrack, setAlbumPlayListTrack] = useRecoilState(
    albumPlayListTrackState
  );
  const isPlaying = albumPlayListTrack?.isPlaying ?? false;
  const currentItem = albumPlayListSelectorTrack?.currentItem ?? null;
  const loadingState = audioTrackLoadable.state;
  const audioContent = audioTrackLoadable.contents;
  const [PlayerState, setPlayerState] = React.useState(init);

  React.useEffect(() => {
    if (!!searchTrack) {
      if (loadingState === "hasValue")
        if (searchTrack)
          setPlayerState({
            ...PlayerState,
            track: `http://localhost:3000/youtube.com/watch?v=${audioContent.videoId}`,
            totalDuration: audioContent.totalDuration,
            isEnded: false,
          });
        else setPlayerState(init);
    }
  }, [loadingState, searchTrack]);

  // Adding onTimeUpdate Event listener to player
  React.useEffect(() => {
    if (player.current) {
      player.current.src = PlayerState.track;
      player.current.onstalled = () => {
        setAlbumPlayListTrack((prevState) => ({
          ...prevState,
          isPlaying: PLAYMODE.LOADING,
        }));
      };
      player.current.onloadeddata = () => {
        setAlbumPlayListTrack((prevState) => ({
          ...prevState,
          isPlaying: PLAYMODE.PLAYING,
        }));
        player.current.play();
        playItemsTrack();
      };
      player.current.ontimeupdate = (event) =>
        setPlayerState((previousState) => ({
          ...previousState,
          currentTime: previousState.isSliding
            ? previousState.currentTime
            : parseInt(event.srcElement.currentTime),
        }));
      async function playItemsTrack() {
        const { itemId, song, artists, imageSource } =
          albumPlayListSelectorTrack.currentItem;
        await musixAxios(musixToken()).put("/playItems/", {
          type: "track",
          spotifyId: itemId,
          name: song,
          description: "",
          imgUrl: imageSource,
          artists,
        });
      }
    }
  }, [PlayerState.track]);

  React.useEffect(() => {
    if (player.current)
      player.current.onended = (event) => {
        setPlayerState({ ...init, isEnded: true });
        const { idx, totalLength, nextSearchTrack } =
          albumPlayListSelectorTrack;
        if (idx >= 0) {
          setSearchTrack(nextSearchTrack);
          setAlbumPlayListTrack((prevState) => {
            if (idx == 0) {
              if (totalLength == 1)
                return {
                  ...prevState,
                  isPlaying: PLAYMODE.PAUSE,
                  items: [
                    { ...prevState.items[idx], isPlaying: PLAYMODE.PAUSE },
                  ],
                };
              return {
                ...prevState,
                items: [
                  {
                    ...prevState.items[idx],
                    isPlaying: PLAYMODE.PLAYING,
                  },
                  ...prevState.items.slice(1, totalLength - 1),
                  {
                    ...prevState.items[totalLength - 1],
                    isPlaying: PLAYMODE.INQUEUE,
                  },
                ],
              };
            }
            return {
              ...prevState,
              items: [
                ...prevState.items.slice(0, idx - 1),
                {
                  ...prevState.items[idx - 1],
                  isPlaying: PLAYMODE.INQUEUE,
                },
                {
                  ...prevState.items[idx],
                  isPlaying: PLAYMODE.PLAYING,
                },
                ...prevState.items.slice(idx + 1),
              ],
            };
          });
        }
      };
  }, [albumPlayListSelectorTrack]);

  const handlePlayerChange = (value) => {
    setPlayerState((previousState) => ({
      ...previousState,
      currentTime: parseInt(value),
      isSliding: true,
    }));
  };

  const handlePlayerChangeEnd = (value) => {
    setPlayerState((prevState) => ({ ...prevState, isSliding: false }));
    player.current.currentTime = parseInt(value);
  };

  React.useEffect(() => {
    if (player.current.src === PlayerState.track) {
      if (isPlaying === PLAYMODE.PLAYING) player.current.play();
      else if (isPlaying === PLAYMODE.PAUSE) player.current.pause();
    }
  }, [player, isPlaying]);

  const handlePlayPauseClick = () => {
    const { idx, totalLength } = albumPlayListSelectorTrack;
    let currentIdx = idx - 1;
    if (idx == 0) currentIdx = totalLength - 1;
    if (PlayerState.track) {
      if (isPlaying) {
        setAlbumPlayListTrack((prevState) =>
          getNewStateForPlayPause(prevState, PLAYMODE.PAUSE, currentIdx)
        );
      } else {
        setAlbumPlayListTrack((prevState) =>
          getNewStateForPlayPause(prevState, PLAYMODE.PLAYING, currentIdx)
        );
      }
    }
    if (PlayerState.isEnded && !isPlaying) {
      setAlbumPlayListTrack((prevState) =>
        getNewStateForPlayPause(prevState, PLAYMODE.PLAYING, currentIdx)
      );
      audioTrackRefresh();
    }
  };

  return (
    <React.Fragment>
      <audio ref={player} />
      <AgentDetect
        mobileComponent={
          <MobileMusixPlayer
            currentItem={currentItem}
            isPlaying={isPlaying}
            handlePlayPauseClick={handlePlayPauseClick}
          />
        }
        desktopComponent={
          <DesktopMusixPlayer
            PlayerState={PlayerState}
            currentItem={currentItem}
            handlePlayerChange={handlePlayerChange}
            isPlaying={isPlaying}
            handlePlayerChangeEnd={handlePlayerChangeEnd}
            handlePlayPauseClick={handlePlayPauseClick}
          />
        }
      />
    </React.Fragment>
  );
}

export function TrackLabel({ currentItem }) {
  const { imageSource, song, itemId, artists } = currentItem;
  const artistName = artists.map((artist) => artist.name).join();
  const onLiked = useLiked();
  const likedItems = useRecoilValue(likedItemsState);
  const isLiked = !!likedItems[itemId] && likedItems[itemId] === "track";
  const isMobile = useAgent();
  return (
    <HStack columnGap={pxToAll(10)}>
      <Box width={isMobile ? pxToAll(100) : pxToAll(60)}>
        <Image src={imageSource} />
      </Box>
      <Box maxW={pxToAll(150)}>
        <Text textStyle={isMobile ? "h5" : "h6"} color={"text.play"}>
          {song}
        </Text>
        <Text textStyle={"label"} isTruncated>
          {artistName}
        </Text>
      </Box>
      <Icon
        as={isLiked ? FcLike : GiSelfLove}
        textStyle={"icon.md"}
        _hover={{
          color: "text.play",
          transition: "all 0.25s",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onLiked(itemId, "track");
        }}
      />
    </HStack>
  );
}
