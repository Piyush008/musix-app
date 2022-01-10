import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, useMediaQuery} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useRef, useState} from "../../_snowpack/pkg/react.js";
import {Outlet} from "../../_snowpack/pkg/react-router-dom.js";
import Header from "../components/header/Header.js";
import Logo from "../components/logo/Logo.js";
import MusixPlayer from "../components/player/MusixPlayer.js";
import DesktopSideBar from "../components/sidebar/DesktopSideBar.js";
import MobileSideBar from "../components/sidebar/MobileSideBar.js";
import AgentDetect from "../components/util/AgentDetect.js";
import {pxToRem} from "../utils/theme.utils.js";
export default function HomePage() {
  const ref = useRef();
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const handleScroll = (scrollTop, scrollHeight) => {
    let opacity = scrollTop / scrollHeight / 0.15;
    if (opacity <= 1) {
      setHeaderOpacity(opacity);
    } else {
      setHeaderOpacity(1);
    }
  };
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    wrap: "nowrap"
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "row",
    wrap: "nowrap",
    h: "100vh"
  }, /* @__PURE__ */ React.createElement(DesktopSideBar, null), /* @__PURE__ */ React.createElement(Flex, {
    ref,
    direction: "column",
    width: "100%",
    height: `calc(100vh - ${pxToRem(100)})`,
    minHeight: "unset",
    overflow: "auto",
    onScroll: () => handleScroll(ref.current.scrollTop, ref.current.scrollHeight),
    css: {
      "&::-webkit-scrollbar": {
        width: "6px"
      },
      "&::-webkit-scrollbar-track": {
        width: "6px"
      },
      "&::-webkit-scrollbar-thumb": {
        background: "rgba(0, 0, 0, 0.4)",
        borderRadius: "24px"
      }
    }
  }, /* @__PURE__ */ React.createElement(Header, {
    headerOpacity
  }), /* @__PURE__ */ React.createElement(Outlet, null))), /* @__PURE__ */ React.createElement(MusixPlayer, null), /* @__PURE__ */ React.createElement(AgentDetect, {
    mobileComponent: /* @__PURE__ */ React.createElement(MobileSideBar, null),
    desktopComponent: /* @__PURE__ */ React.createElement(Box, null)
  }));
}
