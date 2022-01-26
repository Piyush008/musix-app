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
  onPlayClick,
  isPlaying,
  ...otherProps
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  return (
    <Box
      role="group"
      bgColor="blackAlpha.200"
      borderRadius="4"
      padding="2.5"
      cursor="pointer"
      _hover={{ bgColor: "whiteAlpha.100" }}
      onMouseEnter={() => setPlayButtonVisble(true)}
      onMouseLeave={() => setPlayButtonVisble(false)}
      onClick={onClick}
      {...otherProps}
    >
      <Box>
        <Image
          borderRadius={imageBorderRadius}
          boxShadow="0 8px 24px rgb(0 0 0 / 50%)"
          src={imageSource}
        />
        <Box height="0" position="relative" textAlign="right">
          <IconButton
            visibility={PlayButtonVisble ? "visible" : "hidden"}
            fontSize="0.75rem !important"
            paddingInlineStart="0px !important"
            paddingInlineEnd="0px !important"
            borderRadius="100%"
            bgColor="green.300"
            padding="8px !important"
            top={"0rem"}
            right="0.17rem"
            color="white"
            _hover={{
              bgColor: "blackAlpha.700",
              transform: "scale(1.2,1.2)",
              cursor: "pointer",
            }}
            _groupHover={{
              top: "-1.75rem",
              transition: "top 1s visibility 1s",
            }}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
          />
        </Box>
      </Box>
      <Box paddingTop={pxToAll(15)}>
        <Text isTruncated textStyle={"h5"} color={"text.secondary"}>
          {title}
        </Text>
        <Text noOfLines={2} textStyle={"h6"}>
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
}

BigCard.defaultProps = {
  imageBorderRadius: "4",
  height: "100%",
  width: "100%",
  marginTop: "0.7rem",
};

export default BigCard;
