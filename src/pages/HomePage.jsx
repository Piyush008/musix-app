import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Logo from "../components/logo/Logo";
import MusixPlayer from "../components/player/MusixPlayer";
import DesktopSideBar from "../components/sidebar/DesktopSideBar";
import MobileSideBar from "../components/sidebar/MobileSideBar";

export default function HomePage() {
  return (
    <Flex direction={"column"} wrap={"nowrap"}>
      <Flex direction={"row"} wrap={"nowrap"} h={"90vh"}>
        <DesktopSideBar />
        <Outlet />
      </Flex>
      <MusixPlayer />
      <MobileSideBar />
    </Flex>
  );
}
