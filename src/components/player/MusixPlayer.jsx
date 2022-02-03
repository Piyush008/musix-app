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
  const secondsToMins = (sec) =>
    `${Math.floor(sec / 60)}:${("0" + (sec % 60)).slice(-2)}`;
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
    >
      <Slider aria-label="slider-ex-2" colorScheme="pink" defaultValue={50}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <HStack
        w="100%"
        justifyContent={"space-between"}
        paddingLeft={"4"}
        paddingRight={"4"}
        paddingBottom={"2"}
      >
        <GoogleLogout />
        <Box
          borderRadius={"1rem"}
          borderWidth={"thin"}
          p="1.5"
          fontSize={pxToAll(18)}
          boxShadow={"inset 0 0 20px black"}
          borderColor={"blackAlpha.200"}
        >
          {secondsToMins(0)}
        </Box>
        <Box>
          <IconButton
            fontSize={`${pxToRem(24)} !important`}
            paddingTop={`${pxToRem(18)} !important`}
            paddingBottom={`${pxToRem(18)} !important`}
            paddingInlineStart={`${pxToRem(18)} !important`}
            paddingInlineEnd={`${pxToRem(18)} !important`}
            borderRadius="100%"
            isRound={true}
            icon={<FaPause />}
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
          {secondsToMins(500)}
        </Box>
      </HStack>
    </VStack>
  );
}
