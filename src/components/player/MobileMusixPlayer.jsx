import { Box, Flex, Icon } from "@chakra-ui/react";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import { pxToAll } from "../../utils/theme.utils.js";
import { TrackLabel } from "./MusixPlayer";
import { FaPause, FaPlay } from "react-icons/fa";
import { CgPlayTrackNext } from "react-icons/cg";

export default function MobileMusixPlayer({
  currentItem,
  handlePlayPauseClick,
  isPlaying,
}) {
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      pr={pxToAll(20)}
      bg={"brand.secondary"}
      w={"100%"}
      height={pxToAll(100)}
      pos={"fixed"}
      bottom={pxToAll(75)}
      zIndex={"1"}
      boxShadow={`0 -5px 25px rgba(0,0,0,0.2)`}
    >
      <Box width={"75%"} height={"100%"}>
        {!!currentItem && <TrackLabel currentItem={currentItem} />}
      </Box>
      <Flex w={"25%"} columnGap={pxToAll(20)} justify={"flex-end"}>
        <Icon
          onClick={handlePlayPauseClick}
          textStyle={"icon.md"}
          as={isPlaying ? FaPause : FaPlay}
        />
        <Icon textStyle={"icon.md"} as={CgPlayTrackNext} />
      </Flex>
    </Flex>
  );
}
