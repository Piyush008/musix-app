import { secondsToMins } from "../../utils/conversion.utils.js";
import { pxToAll } from "../../utils/theme.utils.js";
import { TrackLabel } from "./MusixPlayer";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay, FaHamburger } from "react-icons/fa";
import { GiSoundOn, GiSoundWaves } from "react-icons/gi";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { BiShuffle } from "react-icons/bi";
import { MdRepeat } from "react-icons/md";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
export default function DesktopMusixPlayer({
  PlayerState,
  currentItem,
  handlePlayerChange,
  isPlaying,
  handlePlayerChangeEnd,
  handlePlayPauseClick,
}) {
  const isDisabled = PlayerState.track === null;
  return (
    <Grid
      gridTemplateColumns={`minmax(200px, 1fr) minmax(300px, 1fr) 1fr`}
      columnGap={"30px"}
      px={pxToAll(20)}
      bg={"brand.secondary"}
      w={"100%"}
      height={pxToAll(100)}
      pos={"fixed"}
      bottom={"0"}
      zIndex={"1"}
      boxShadow={`0 -5px 25px rgba(0,0,0,0.2)`}
      alignItems={"center"}
    >
      <GridItem>
        {!!currentItem && <TrackLabel currentItem={currentItem} />}
      </GridItem>
      <GridItem>
        <Flex direction={"row"} wrap="nowrap">
          <Text textStyle={"label"}>
            {secondsToMins(PlayerState.currentTime)}
          </Text>
          <Slider
            aria-label="slider-ex-2"
            defaultValue={0}
            value={PlayerState.currentTime}
            onChange={handlePlayerChange}
            max={PlayerState.totalDuration}
            isDisabled={isDisabled}
            onChangeEnd={handlePlayerChangeEnd}
            focusThumbOnChange={false}
            mx={pxToAll(15)}
          >
            <SliderTrack bg={"shade.hoverPrimary"}>
              <SliderFilledTrack bg={"text.play"} />
            </SliderTrack>
            <SliderThumb bg={"text.primary"} hidden>
              <Box color={"text.play"} as={GiSoundWaves} />
            </SliderThumb>
          </Slider>
          <Text textStyle={"label"}>
            {secondsToMins(PlayerState.totalDuration)}
          </Text>
        </Flex>
        <Flex
          direction={"row"}
          w="100%"
          justifyContent={"center"}
          wrap="nowrap"
          columnGap={pxToAll(20)}
          marginTop={pxToAll(5)}
          alignItems={"center"}
        >
          <Icon as={BiShuffle} textStyle={"icon.sm"} />
          <IconButton
            size={"mdlg"}
            icon={<CgPlayTrackPrev />}
            isDisabled={isDisabled}
          />
          <IconButton
            onClick={handlePlayPauseClick}
            isLoading={isPlaying === PLAYMODE.LOADING}
            size={"mdlg"}
            isDisabled={isDisabled}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
          />
          <IconButton
            size={"mdlg"}
            icon={<CgPlayTrackNext />}
            isDisabled={isDisabled}
          />
          <Icon as={MdRepeat} textStyle={"icon.sm"} />
        </Flex>
      </GridItem>
      <GridItem>
        <Flex
          direction={"row"}
          justifyContent={"flex-end"}
          columnGap={pxToAll(20)}
          alignItems={"center"}
        >
          <Icon as={FaHamburger} textStyle={"icon.md"} />
          <Icon as={GiSoundOn} textStyle={"icon.md"} />
          <Slider
            aria-label="slider-ex-2"
            defaultValue={0}
            w={pxToAll(100)}
            isDisabled={isDisabled}
          >
            <SliderTrack bg={"shade.hoverPrimary"}>
              <SliderFilledTrack bg={"text.play"} />
            </SliderTrack>
          </Slider>
        </Flex>
      </GridItem>
    </Grid>
  );
}
