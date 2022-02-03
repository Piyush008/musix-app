import React from "../../../_snowpack/pkg/react.js";
import {
  Box,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import useAgent from "../../hooks/useAgent.js";
import {pxToAll, pxToRem} from "../../utils/theme.utils.js";
import {FaPause, FaPlay} from "../../../_snowpack/pkg/react-icons/fa.js";
export default function MusixPlayer() {
  const isMobile = useAgent();
  const secondsToMins = (sec) => `${Math.floor(sec / 60)}:${("0" + sec % 60).slice(-2)}`;
  return /* @__PURE__ */ React.createElement(VStack, {
    justify: "space-evenly",
    height: pxToAll(100),
    pos: "fixed",
    bottom: isMobile ? pxToAll(75) : "0",
    w: "100%",
    bg: "brand.secondary",
    zIndex: "1",
    boxShadow: `0 -5px 25px rgba(0,0,0,0.2)`
  }, /* @__PURE__ */ React.createElement("audio", {
    display: "none"
  }), /* @__PURE__ */ React.createElement(Slider, {
    "aria-label": "slider-ex-2",
    colorScheme: "pink",
    defaultValue: 50
  }, /* @__PURE__ */ React.createElement(SliderTrack, null, /* @__PURE__ */ React.createElement(SliderFilledTrack, null)), /* @__PURE__ */ React.createElement(SliderThumb, null)), /* @__PURE__ */ React.createElement(HStack, {
    w: "100%",
    justifyContent: "space-between",
    paddingLeft: "4",
    paddingRight: "4",
    paddingBottom: "2"
  }, /* @__PURE__ */ React.createElement(Box, {
    borderRadius: "1rem",
    borderWidth: "thin",
    p: "1.5",
    fontSize: pxToAll(18),
    boxShadow: "inset 0 0 20px black",
    borderColor: "blackAlpha.200"
  }, secondsToMins(0)), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(IconButton, {
    fontSize: `${pxToRem(24)} !important`,
    paddingTop: `${pxToRem(18)} !important`,
    paddingBottom: `${pxToRem(18)} !important`,
    paddingInlineStart: `${pxToRem(18)} !important`,
    paddingInlineEnd: `${pxToRem(18)} !important`,
    borderRadius: "100%",
    isRound: true,
    icon: /* @__PURE__ */ React.createElement(FaPause, null)
  })), /* @__PURE__ */ React.createElement(Box, {
    borderRadius: "1rem",
    borderWidth: "thin",
    p: "1.5",
    fontSize: pxToAll(18),
    boxShadow: "inset 0 0 20px black",
    borderColor: "blackAlpha.200"
  }, secondsToMins(500))));
}
