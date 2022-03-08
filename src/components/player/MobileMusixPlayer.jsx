import { Box, Flex, Icon, Slide, useMediaQuery } from "@chakra-ui/react";
import { PLAYMODE } from "../../utils/constants/trackState.constants.js";
import { pxToAll, pxToRem, pxToRemSm } from "../../utils/theme.utils.js";
import { TrackLabel } from "./MusixPlayer";
import { FaPause, FaPlay } from "react-icons/fa";
import { CgPlayTrackNext } from "react-icons/cg";

export default function MobileMusixPlayer({
  currentItem,
  handlePlayPauseClick,
  isPlaying,
}) {
  const [isLarger] = useMediaQuery("(min-width:768px)");
  return (
    <Slide
      direction="bottom"
      in={isPlaying !== false}
      style={{
        zIndex: 1,
        bottom: isLarger ? pxToRem(75) : pxToRemSm(75 / 1.5),
      }}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        pr={pxToAll(20)}
        bg={"brand.secondary"}
        w={"100%"}
        height={pxToAll(100)}
        boxShadow={`0 -5px 25px rgba(0,0,0,0.2)`}
      >
        <Box width={"85%"} height={"100%"}>
          {!!currentItem && <TrackLabel currentItem={currentItem} />}
        </Box>
        <Flex w={"15%"} columnGap={pxToAll(15)} justify={"flex-end"}>
          <Icon
            onClick={handlePlayPauseClick}
            textStyle={"icon.md"}
            as={isPlaying ? FaPause : FaPlay}
          />
          <Icon textStyle={"icon.md"} as={CgPlayTrackNext} />
        </Flex>
      </Flex>
    </Slide>
  );
}
