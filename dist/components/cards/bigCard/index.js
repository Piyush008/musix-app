import React from "../../../../_snowpack/pkg/react.js";
import {Box, IconButton, Image, Text} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {useState} from "../../../../_snowpack/pkg/react.js";
import {pxToAll} from "../../../utils/theme.utils.js";
import {FaPlay, FaPause} from "../../../../_snowpack/pkg/react-icons/fa.js";
function BigCard({
  imageSource,
  imageBorderRadius,
  title,
  subtitle,
  onClick,
  onPlayClick,
  isPlaying
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  return /* @__PURE__ */ React.createElement(Box, {
    width: pxToAll(190),
    height: pxToAll(268),
    bgColor: "blackAlpha.200",
    borderRadius: "4",
    padding: "2.5",
    cursor: "pointer",
    _hover: {bgColor: "whiteAlpha.100"},
    onMouseEnter: () => setPlayButtonVisble(true),
    onMouseLeave: () => setPlayButtonVisble(false)
  }, /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Image, {
    borderRadius: imageBorderRadius,
    boxShadow: "0 8px 24px rgb(0 0 0 / 50%)",
    src: imageSource
  }), /* @__PURE__ */ React.createElement(Box, {
    height: "0",
    position: "relative"
  }, /* @__PURE__ */ React.createElement(IconButton, {
    visibility: PlayButtonVisble ? "visible" : "hidden",
    fontSize: "0.75rem !important",
    paddingInlineStart: "0px !important",
    paddingInlineEnd: "0px !important",
    borderRadius: "100%",
    bgColor: "green.300",
    padding: "8px !important",
    top: "-2.2rem",
    left: "4rem",
    _hover: {bgColor: "blackAlpha.700", transform: "scale(1.2,1.2)"},
    icon: isPlaying ? /* @__PURE__ */ React.createElement(FaPause, null) : /* @__PURE__ */ React.createElement(FaPlay, null)
  }))), /* @__PURE__ */ React.createElement(Box, {
    paddingTop: pxToAll(16)
  }, /* @__PURE__ */ React.createElement(Text, {
    isTruncated: true,
    fontSize: pxToAll(16),
    fontWeight: "bold"
  }, title), /* @__PURE__ */ React.createElement(Text, {
    noOfLines: 2,
    fontSize: pxToAll(14),
    lineHeight: pxToAll(16),
    fontWeight: "light"
  }, subtitle)));
}
BigCard.defaultProps = {
  imageBorderRadius: "4"
};
export default BigCard;