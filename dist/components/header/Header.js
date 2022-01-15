import React from "../../../_snowpack/pkg/react.js";
import {
  Box,
  Circle,
  HStack,
  Icon,
  Button
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight
} from "../../../_snowpack/pkg/react-icons/md.js";
import {pxToAll} from "../../utils/theme.utils.js";
import Logo from "../logo/Logo.js";
import {Route, Routes} from "../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
import AgentDetect from "../util/AgentDetect.js";
import SearchInput from "../Input/SearchInput.js";
export default function Header({headerOpacity}) {
  return /* @__PURE__ */ React.createElement(Box, {
    h: pxToAll(80),
    pos: "sticky",
    top: "0",
    zIndex: "1",
    right: "0"
  }, /* @__PURE__ */ React.createElement(Box, {
    position: "relative"
  }, /* @__PURE__ */ React.createElement(Box, {
    position: "absolute",
    width: "100%",
    height: pxToAll(80),
    bg: "brand.primary",
    opacity: headerOpacity,
    zIndex: "-1"
  }), /* @__PURE__ */ React.createElement(HStack, {
    justifyContent: "space-between",
    alignItems: "center",
    px: pxToAll(30),
    py: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(AgentDetect, {
    mobileComponent: /* @__PURE__ */ React.createElement(Logo, null),
    desktopComponent: /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Circle, {
      size: pxToAll(35),
      bg: "shade.secondary"
    }, /* @__PURE__ */ React.createElement(Icon, {
      as: MdKeyboardArrowLeft,
      textStyle: "icon.md"
    })), /* @__PURE__ */ React.createElement(Circle, {
      size: pxToAll(35),
      bg: "shade.secondary"
    }, /* @__PURE__ */ React.createElement(Icon, {
      as: MdKeyboardArrowRight,
      textStyle: "icon.md"
    })), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
      path: `${ROUTER.SEARCH}/*`,
      element: /* @__PURE__ */ React.createElement(SearchInput, null)
    })))
  }), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Button, null, "Enter Musix")))));
}
