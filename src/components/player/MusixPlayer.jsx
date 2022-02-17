import {
  Box,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import useAgent from "../../hooks/useAgent.js";
import { pxToAll, pxToRem } from "../../utils/theme.utils.js";
import { FaPause, FaPlay } from "react-icons/fa";
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
import { secondsToMins } from "../../utils/conversion.utils.js";
import { albumPlayListSelectorTrackState } from "../../selector/albumPlayList.selector.js";
import {
  albumPlayListTrackState,
  searchTrackState,
} from "../../atoms/albumPlayList.atom.js";

const init = {
  track: null,
  isLoading: false,
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
  const isMobile = useAgent();
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
  const loadingState = audioTrackLoadable.state;
  const audioContent = audioTrackLoadable.contents;
  const [PlayerState, setPlayerState] = React.useState(init);

  console.log("Hi");
  React.useEffect(() => {
    if (!!searchTrack) {
      if (loadingState === "loading")
        setPlayerState({ ...PlayerState, isLoading: true });
      else if (loadingState === "hasValue")
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
      player.current.onstalled = () => console.log("stalled");
      player.current.onloadeddata = () => {
        setPlayerState((prevState) => ({ ...prevState, isLoading: false }));
        player.current.play();
      };
      player.current.ontimeupdate = (event) =>
        setPlayerState((previousState) => ({
          ...previousState,
          currentTime: previousState.isSliding
            ? previousState.currentTime
            : parseInt(event.srcElement.currentTime),
        }));
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
        setAlbumPlayListTrack((prevState) => ({
          ...prevState,
          isPlaying: PLAYMODE.PAUSE,
          items: [
            ...prevState.items.slice(0, currentIdx),
            {
              ...prevState.items[currentIdx],
              isPlaying: PLAYMODE.PAUSE,
            },
            ...prevState.items.slice(currentIdx + 1),
          ],
        }));
      } else {
        setAlbumPlayListTrack((prevState) => ({
          ...prevState,
          isPlaying: PLAYMODE.PLAYING,
          items: [
            ...prevState.items.slice(0, currentIdx),
            {
              ...prevState.items[currentIdx],
              isPlaying: PLAYMODE.PLAYING,
            },
            ...prevState.items.slice(currentIdx + 1),
          ],
        }));
      }
    }
    if (PlayerState.isEnded && !isPlaying) {
      setAlbumPlayListTrack((prevState) => ({
        ...prevState,
        isPlaying: PLAYMODE.PLAYING,
        items: [
          ...prevState.items.slice(0, currentIdx),
          {
            ...prevState.items[currentIdx],
            isPlaying: PLAYMODE.PLAYING,
          },
          ...prevState.items.slice(currentIdx + 1),
        ],
      }));
      audioTrackRefresh();
    }
  };

  return (
    <VStack
      justify={"space-evenly"}
      height={pxToAll(100)}
      pos={"fixed"}
      bottom={isMobile ? pxToAll(75) : "0"}
      w={"100%"}
      bg={"brand.secondary"}
      zIndex={"1"}
      boxShadow={`0 -5px 25px rgba(0,0,0,0.2)`}
      px={"6"}
    >
      <audio ref={player} />
      <Slider
        aria-label="slider-ex-2"
        colorScheme="pink"
        defaultValue={0}
        value={PlayerState.currentTime}
        onChange={handlePlayerChange}
        max={PlayerState.totalDuration}
        isDisabled={PlayerState.isLoading}
        onChangeEnd={handlePlayerChangeEnd}
        focusThumbOnChange={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <HStack w="100%" justifyContent={"space-between"} paddingBottom={"2"}>
        <Box
          borderRadius={"1rem"}
          borderWidth={"thin"}
          p="1.5"
          fontSize={pxToAll(18)}
          boxShadow={"inset 0 0 20px black"}
          borderColor={"blackAlpha.200"}
        >
          {secondsToMins(PlayerState.currentTime)}
        </Box>
        <Box>
          <IconButton
            fontSize={`${pxToRem(24)} !important`}
            paddingTop={`${pxToRem(18)} !important`}
            paddingBottom={`${pxToRem(18)} !important`}
            paddingInlineStart={`${pxToRem(18)} !important`}
            paddingInlineEnd={`${pxToRem(18)} !important`}
            borderRadius="100%"
            onClick={handlePlayPauseClick}
            isLoading={PlayerState.isLoading}
            isRound={true}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
          />
        </Box>
        <Box
          borderRadius={"1rem"}
          borderWidth={"thin"}
          p="1.5"
          fontSize={pxToAll(18)}
          boxShadow={"inset 0 0 20px black"}
          borderColor={"blackAlpha.200"}
        >
          {secondsToMins(PlayerState.totalDuration)}
        </Box>
      </HStack>
    </VStack>
  );
}
