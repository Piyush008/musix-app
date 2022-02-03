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

export default function MusixPlayer() {
  const isMobile = useAgent();
  const player = React.useRef();

  const [PlayerState, setPlayerState] = React.useState({
    track: "http://localhost:3000/youtube.com/watch?v=9iIX4PBplAY",
    isPlaying: false,
    isLoading: false,
    totalDuration: 211.281,
    currentTime: 0,
  });

  // Adding onTimeUpdate Event listener to player
  React.useEffect(() => {
    if (player.current) {
      player.current.ontimeupdate = (event) =>
        setPlayerState((previousState) => ({
          ...previousState,
          currentTime: event.srcElement.currentTime,
        }));
    }
  }, [player]);

  React.useEffect(() => {
    if (player.current) {
      player.current.src = PlayerState.track;
      player.current.onstalled = () => console.log("stalled");
      player.current.onseeked = () =>
        setPlayerState((previousState) => ({
          ...previousState,
          isLoading: false,
        }));
      player.current.onseeking = () =>
        setPlayerState((previousState) => ({
          ...previousState,
          isLoading: true,
        }));
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

  const getSliderValue = () =>
    (PlayerState.currentTime / PlayerState.totalDuration) * 100;

  const handlePlayerChange = (value) => {
    let currentTime = (value * PlayerState.totalDuration) / 100;
    setPlayerState((previousState) => ({
      ...previousState,
      currentTime: currentTime,
    }));
    if (player.current) {
      player.current.currentTime = currentTime;
    }
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
        value={getSliderValue()}
        onChange={handlePlayerChange}
        isDisabled={PlayerState.isLoading}
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
