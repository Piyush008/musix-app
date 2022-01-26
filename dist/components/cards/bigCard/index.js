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
  isPlaying,
  ...otherProps
}) {
  const [PlayButtonVisble, setPlayButtonVisble] = useState(false);
  return /* @__PURE__ */ React.createElement(Box, {
    role: "group",
    bgColor: "blackAlpha.200",
    borderRadius: "4",
    padding: "2.5",
    cursor: "pointer",
    _hover: {bgColor: "whiteAlpha.100"},
    onMouseEnter: () => setPlayButtonVisble(true),
    onMouseLeave: () => setPlayButtonVisble(false),
    onClick,
    ...otherProps
  }, /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Image, {
    borderRadius: imageBorderRadius,
    boxShadow: "0 8px 24px rgb(0 0 0 / 50%)",
    src: imageSource
  }), /* @__PURE__ */ React.createElement(Box, {
    height: "0",
    position: "relative",
    textAlign: "right"
  }, /* @__PURE__ */ React.createElement(IconButton, {
    visibility: PlayButtonVisble ? "visible" : "hidden",
    fontSize: "0.75rem !important",
    paddingInlineStart: "0px !important",
    paddingInlineEnd: "0px !important",
    borderRadius: "100%",
    bgColor: "green.300",
    padding: "8px !important",
    top: "0rem",
    right: "0.17rem",
    color: "white",
    _hover: {
      bgColor: "blackAlpha.700",
      transform: "scale(1.2,1.2)",
      cursor: "pointer"
    },
    _groupHover: {
      top: "-1.75rem",
      transition: "top 1s visibility 1s"
    },
    icon: isPlaying ? /* @__PURE__ */ React.createElement(FaPause, null) : /* @__PURE__ */ React.createElement(FaPlay, null)
  }))), /* @__PURE__ */ React.createElement(Box, {
    paddingTop: pxToAll(15)
  }, /* @__PURE__ */ React.createElement(Text, {
    isTruncated: true,
    textStyle: "h5",
    color: "text.secondary"
  }, title), /* @__PURE__ */ React.createElement(Text, {
    noOfLines: 2,
    textStyle: "h6"
  }, subtitle)));
}
BigCard.defaultProps = {
  imageBorderRadius: "4",
  height: "100%",
  width: "100%",
  marginTop: "0.7rem"
};
export default BigCard;
