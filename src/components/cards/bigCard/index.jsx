import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { pxToAll } from "./../../../utils/theme.utils.js";

function BigCard({
  imageSource,
  imageBorderRadius,
  title,
  subtitle,
  onClick,
  onPlayClick,
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  return (
    <Box
      width={pxToAll(190)}
      height={pxToAll(268)}
      bgColor="blackAlpha.200"
      borderRadius="4"
      padding="2.5"
      _hover={{ bgColor: "whiteAlpha.100" }}
    >
      <Box position="relative">
        <Image
          borderRadius={imageBorderRadius}
          boxShadow="0 8px 24px rgb(0 0 0 / 50%)"
          src={imageSource}
        />
      </Box>
    </Box>
  );
}

BigCard.defaultProps = {
  imageBorderRadius: "4",
};

export default BigCard;
