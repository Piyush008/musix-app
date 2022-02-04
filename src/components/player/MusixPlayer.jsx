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
import { searchTrackState } from "../../pages/AlbumPlayListPage.jsx";
import {
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { youtubeSearch } from "../../utils/auth.utils.js";
import { authState } from "../../App/App.jsx";

const init = {
  track: null,
  isPlaying: false,
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
    const search = get(searchTrackState);
    if (auth.isAuth && search) {
      const [data, error] = await youtubeSearch(search);
      if (error) throw error;
      return data;
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
  const searchTrack = useRecoilValue(searchTrackState);
  const loadingState = audioTrackLoadable.state;
  const audioContent = audioTrackLoadable.contents;
  const [PlayerState, setPlayerState] = React.useState(init);

  React.useEffect(() => {
    audioTrackRefresh();
  }, [searchTrack]);

  React.useEffect(() => {
    if (loadingState === "loading")
      setPlayerState({ ...PlayerState, isLoading: true, isPlaying: false });
    else if (loadingState === "hasValue")
      if (searchTrack)
        setPlayerState({
          ...PlayerState,
          isLoading: false,
          isPlaying: true,
          track: `http://localhost:3000/youtube.com/watch?v=${audioContent.videoId}`,
          totalDuration: audioContent.totalDuration,
          isEnded: false,
        });
      else setPlayerState(init);
  }, [loadingState]);

  // Adding onTimeUpdate Event listener to player
  React.useEffect(() => {
    if (player.current) {
      player.current.ontimeupdate = (event) =>
        setPlayerState((previousState) => ({
          ...previousState,
          currentTime: previousState.isSliding
            ? previousState.currentTime
            : parseInt(event.srcElement.currentTime),
        }));
      player.current.onended = (event) => {
        setPlayerState({ ...init, isEnded: true });
      };
    }
  }, [player]);

  React.useEffect(() => {
    if (player.current) {
      player.current.src = PlayerState.track;
      player.current.onstalled = () => console.log("stalled");
      // player.current.onseeked = () =>
      //   setPlayerState((previousState) => ({
      //     ...previousState,
      //     isLoading: false,
      //   }));
      // player.current.onseeking = () =>
      //   setPlayerState((previousState) => ({
      //     ...previousState,
      //     isLoading: true,
      //   }));
    }
  }, [PlayerState.track]);

  React.useEffect(() => {
    if (player.current) {
      if (!PlayerState.isPlaying) {
        player.current.pause();
      } else {
        player.current.play();
      }
    }
  }, [PlayerState.isPlaying]);

  const secondsToMins = (sec) =>
    `${Math.floor(sec / 60)}:${("0" + (Math.floor(sec) % 60)).slice(-2)}`;

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

  const handlePlayPauseClick = () => {
    if (player.current && PlayerState.track) {
      if (PlayerState.isPlaying) {
        setPlayerState((previousState) => ({
          ...previousState,
          isPlaying: false,
        }));
      } else {
        setPlayerState((previousState) => ({
          ...previousState,
          isPlaying: true,
        }));
      }
    }
    if (PlayerState.isEnded && !PlayerState.isPlaying) audioTrackRefresh();
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
            icon={PlayerState.isPlaying ? <FaPause /> : <FaPlay />}
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
