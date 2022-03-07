import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { pxToAll } from "./../../../utils/theme.utils.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { authState } from "../../../atoms/auth.atoms.js";
import useCustomToast from "../../../hooks/useCustomToast.js";

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
  isLoading,
  ...otherProps
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  const auth = useRecoilValue(authState);
  const toast = useCustomToast();
  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (auth.isAuth) {
      if (!isLoading) {
        if (!isPlaying) onPlayClick();
        else onPauseClick();
      }
    } else toast();
  };
  return (
    <Box
      role="group"
      bgColor="blackAlpha.200"
      borderRadius="4"
      padding={"10px"}
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
      <Box height="0" pos="absolute" textAlign="right" right={"10px"}>
        <IconButton
          visibility={PlayButtonVisble ? "visible" : "hidden"}
          top={"0"}
          size="lg"
          _groupHover={{
            top: `${imageWidth === "100%" ? "-2rem" : "0"}`,
            transition: "top 1s visibility 1s",
          }}
          isLoading={isLoading}
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
