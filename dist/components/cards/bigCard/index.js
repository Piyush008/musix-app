import React from "../../../../_snowpack/pkg/react.js";
import {Box, Image} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {useState} from "../../../../_snowpack/pkg/react.js";
import {pxToAll} from "../../../utils/theme.utils.js";
function BigCard({
  imageSource,
  imageBorderRadius,
  title,
  subtitle,
  onClick,
  onPlayClick
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  return /* @__PURE__ */ React.createElement(Box, {
    width: pxToAll(190),
    height: pxToAll(268),
    bgColor: "blackAlpha.200",
    borderRadius: "4",
    padding: "2.5",
    _hover: {bgColor: "whiteAlpha.100"}
  }, /* @__PURE__ */ React.createElement(Box, {
    position: "relative"
  }, /* @__PURE__ */ React.createElement(Image, {
    borderRadius: imageBorderRadius,
    boxShadow: "0 8px 24px rgb(0 0 0 / 50%)",
    src: imageSource
  })));
}
BigCard.defaultProps = {
  imageBorderRadius: "4"
};
export default BigCard;
