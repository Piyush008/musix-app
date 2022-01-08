import React from "../../../_snowpack/pkg/react.js";
import {Box, HStack} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import useAgent from "../../hooks/useAgent.js";
import {pxToAll, pxToRem} from "../../utils/theme.utils.js";
export default function MusixPlayer() {
  const isMobile = useAgent();
  return /* @__PURE__ */ React.createElement(HStack, {
    justify: "space-evenly",
    height: pxToAll(100),
    pos: "fixed",
    bottom: isMobile ? pxToAll(100) : "0",
    w: "100%",
    bg: "brand.secondary",
    zIndex: "1",
    boxShadow: `0 -5px 25px rgba(0,0,0,0.2)`
  });
}
