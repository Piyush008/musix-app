import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { pxToAll } from "./../../../utils/theme.utils.js";
import { FaPlay, FaPause } from "react-icons/fa";

function BigCard({
  imageSource,
  imageBorderRadius,
  title,
  subtitle,
  cardHeight,
  onClick,
  onPlayClick,
  isPlaying,
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  return (
    <Box
      width={pxToAll(190)}
      height={cardHeight}
      bgColor="blackAlpha.200"
      borderRadius="4"
      padding="2.5"
      cursor="pointer"
      _hover={{ bgColor: "whiteAlpha.100" }}
      onMouseEnter={() => setPlayButtonVisble(true)}
      onMouseLeave={() => setPlayButtonVisble(false)}
    >
      <Box>
        <Image
          borderRadius={imageBorderRadius}
          boxShadow="0 8px 24px rgb(0 0 0 / 50%)"
          src={imageSource}
        />
        <Box height="0" position="relative">
          <IconButton
            visibility={PlayButtonVisble ? "visible" : "hidden"}
            fontSize="0.75rem !important"
            paddingInlineStart="0px !important"
            paddingInlineEnd="0px !important"
            borderRadius="100%"
            bgColor="green.300"
            padding="8px !important"
            top="-2.2rem"
            left="4rem"
            color="white"
            _hover={{ bgColor: "blackAlpha.700", transform: "scale(1.2,1.2)" }}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
          />
        </Box>
      </Box>
      <Box paddingTop={pxToAll(16)}>
        <Text isTruncated fontSize={pxToAll(16)} fontWeight="bold">
          {title}
        </Text>
        <Text
          noOfLines={2}
          fontSize={pxToAll(14)}
          lineHeight={pxToAll(16)}
          fontWeight="light"
        >
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
}

BigCard.defaultProps = {
  height: pxToAll(268),
  imageBorderRadius: "4",
};

export default BigCard;
