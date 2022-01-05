import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Logo from "../components/logo/Logo";
import MusixPlayer from "../components/player/MusixPlayer";
import DesktopSideBar from "../components/sidebar/DesktopSideBar";
import MobileSideBar from "../components/sidebar/MobileSideBar";
import { pxToRem } from "../utils/theme.utils.js";

export default function HomePage() {
  return (
    <Flex direction={"column"} wrap={"nowrap"}>
      <Flex direction={"row"} wrap={"nowrap"} h={"90vh"}>
        <DesktopSideBar />
        <Flex
          direction={"column"}
          width={"100%"}
          pb={pxToRem(20)}
          px={pxToRem(30)}
        >
          <Header />
          <Outlet />
        </Flex>
      </Flex>
      <MusixPlayer />
      <MobileSideBar />
    </Flex>
  );
}
