import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Spinner} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useRef, useState} from "../../_snowpack/pkg/react.js";
import {Outlet} from "../../_snowpack/pkg/react-router-dom.js";
import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValueLoadable
} from "../../_snowpack/pkg/recoil.js";
import Header from "../components/header/Header.js";
import MusixPlayer from "../components/player/MusixPlayer.js";
import DesktopSideBar from "../components/sidebar/DesktopSideBar.js";
import MobileSideBar from "../components/sidebar/MobileSideBar.js";
import AgentDetect from "../components/util/AgentDetect.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import {spotifyAuth} from "../utils/spotify.utils.js";
import {pxToRem} from "../utils/theme.utils.js";
export const spotifyAuthState = selector({
  key: "spotifyAuthState",
  get: async () => {
    const [token, error] = await spotifyAuth();
    if (error)
      throw error;
    return token;
  }
});
export default function HomePage() {
  const ref = useRef();
  const spotifyAuthLodableState = useRecoilValueLoadable(spotifyAuthState).state;
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const handleScroll = (scrollTop, scrollHeight) => {
    let opacity = scrollTop / scrollHeight / 0.15;
    if (opacity <= 1) {
      setHeaderOpacity(opacity);
    } else {
      setHeaderOpacity(1);
    }
  };
  const spotifyAuthCallback = useRecoilCallback(() => async () => {
    await spotifyAuth();
  }, []);
  React.useEffect(() => {
    const intervalId = setInterval(spotifyAuthCallback, 3599 * 1e3);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    wrap: "nowrap"
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "row",
    wrap: "nowrap"
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
  }), /* @__PURE__ */ React.createElement(CustomSuspense, {
    fallback: /* @__PURE__ */ React.createElement(Box, {
      pos: "relative",
      top: "30%",
      textAlign: "center"
    }, /* @__PURE__ */ React.createElement(Spinner, {
      size: "lg"
    })),
    state: spotifyAuthLodableState
  }, /* @__PURE__ */ React.createElement(Outlet, null)))), /* @__PURE__ */ React.createElement(MusixPlayer, null), /* @__PURE__ */ React.createElement(AgentDetect, {
    mobileComponent: /* @__PURE__ */ React.createElement(MobileSideBar, null),
    desktopComponent: /* @__PURE__ */ React.createElement(Box, null)
  }));
}
