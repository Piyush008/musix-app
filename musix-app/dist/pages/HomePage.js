import React from "../../../_snowpack/pkg/react.js";
import {Flex, useMediaQuery} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {Outlet} from "../../../_snowpack/pkg/react-router-dom.js";
import Header from "../components/header/Header.js";
import Logo from "../components/logo/Logo.js";
import MusixPlayer from "../components/player/MusixPlayer.js";
import DesktopSideBar from "../components/sidebar/DesktopSideBar.js";
import MobileSideBar from "../components/sidebar/MobileSideBar.js";
import {pxToRem} from "../utils/theme.utils.js";
export default function HomePage() {
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    wrap: "nowrap"
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "row",
    wrap: "nowrap",
    h: "90vh"
  }, /* @__PURE__ */ React.createElement(DesktopSideBar, null), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    width: "100%",
    pb: pxToRem(20),
    px: pxToRem(30)
  }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(Outlet, null))), /* @__PURE__ */ React.createElement(MusixPlayer, null), /* @__PURE__ */ React.createElement(MobileSideBar, null));
}