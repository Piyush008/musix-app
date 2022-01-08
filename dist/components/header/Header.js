import React from "../../../_snowpack/pkg/react.js";
import {useState} from "../../../_snowpack/pkg/react.js";
import {
  Avatar,
  Box,
  Circle,
  HStack,
  Icon,
  useMediaQuery,
  IconButton,
  Wrap,
  Button
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "../../../_snowpack/pkg/react-icons/md.js";
import {pxToAll} from "../../utils/theme.utils.js";
import Logo from "../logo/Logo.js";
import useAgent from "../../hooks/useAgent.js";
import {Route} from "../../../_snowpack/pkg/react-router-dom.js";
export default function Header() {
  const isMobile = useAgent();
  return /* @__PURE__ */ React.createElement(HStack, {
    justifyContent: "space-between",
    h: pxToAll(80),
    alignItems: "center"
  }, !isMobile ? /* @__PURE__ */ React.createElement(Wrap, null, /* @__PURE__ */ React.createElement(Circle, {
    size: pxToAll(30),
    bg: "shade.secondary"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdKeyboardArrowLeft,
    textStyle: "iconMd"
  })), /* @__PURE__ */ React.createElement(Circle, {
    size: pxToAll(30),
    bg: "shade.secondary"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdKeyboardArrowRight,
    textStyle: "iconMd"
  }))) : /* @__PURE__ */ React.createElement(Logo, null), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Button, {
    size: "md"
  }, "Enter Musix")));
}
