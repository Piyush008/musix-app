import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Logo from "../components/logo/Logo";
import MusixPlayer from "../components/player/MusixPlayer";
import DesktopSideBar from "../components/sidebar/DesktopSideBar";
import MobileSideBar from "../components/sidebar/MobileSideBar";
import AgentDetect from "../components/util/AgentDetect";
import { pxToRem } from "../utils/theme.utils.js";

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
  return (
    <Flex direction={"column"} wrap={"nowrap"}>
      <Flex direction={"row"} wrap={"nowrap"} h={"100vh"}>
        <DesktopSideBar />
        <Flex
          ref={ref}
          direction={"column"}
          width={"100%"}
          height={`calc(100vh - ${pxToRem(75)})`}
          minHeight={"unset"}
          overflow={"auto"}
          onScroll={() =>
            handleScroll(ref.current.scrollTop, ref.current.scrollHeight)
          }
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: "24px",
            },
          }}
        >
          <Header headerOpacity={headerOpacity} />
          <Outlet />
        </Flex>
      </Flex>
      <MusixPlayer />
      <AgentDetect
        mobileComponent={<MobileSideBar />}
        desktopComponent={<Box />}
      />
    </Flex>
  );
}
