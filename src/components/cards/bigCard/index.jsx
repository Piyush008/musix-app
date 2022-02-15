import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { pxToAll } from "./../../../utils/theme.utils.js";
import { FaPlay, FaPause } from "react-icons/fa";

function BigCard({
  imageSource,
  imageBorderRadius,
  title,
  subtitle,
  onClick,
  imageWidth,
  onPlayClick,
  onPauseClick,
  isPlaying,
  ...otherProps
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (!isPlaying) onPlayClick();
    else onPauseClick();
  };
  return (
    <Box
      role="group"
      bgColor="blackAlpha.200"
      borderRadius="4"
      padding="2.5"
      cursor="pointer"
      height={"max-content"}
      _hover={{ bgColor: "whiteAlpha.100" }}
      onMouseEnter={() => setPlayButtonVisble(true)}
      onMouseLeave={() => setPlayButtonVisble(false)}
      onClick={onClick}
      pos={"relative"}
      {...otherProps}
    >
      <Box width={imageWidth}>
        <Image
          borderRadius={imageBorderRadius}
          boxShadow="0 8px 24px rgb(0 0 0 / 50%)"
          src={imageSource}
        />
      </Box>
      <Box height="0" pos="absolute" textAlign="right" right={pxToAll(15)}>
        <IconButton
          visibility={PlayButtonVisble ? "visible" : "hidden"}
          fontSize="0.75rem !important"
          paddingInlineStart="0px !important"
          paddingInlineEnd="0px !important"
          borderRadius="100%"
          bgColor="green.300"
          padding="8px !important"
          top={"0"}
          color="white"
          _hover={{
            bgColor: "blackAlpha.700",
            transform: "scale(1.2,1.2)",
            cursor: "pointer",
          }}
          _groupHover={{
            top: `${imageWidth === "100%" ? "-1.75rem" : "0"}`,
            transition: "top 1s visibility 1s",
          }}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={handlePlayClick}
        />
      </Box>
      <Box paddingTop={pxToAll(15)}>
        <Text
          isTruncated
          textStyle={imageWidth !== "100%" ? "h4" : "h6"}
          color={"text.secondary"}
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text noOfLines={2} textStyle={"label"}>
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
}

BigCard.defaultProps = {
  imageBorderRadius: "4",
  marginTop: "0.7rem",
};

export default BigCard;
