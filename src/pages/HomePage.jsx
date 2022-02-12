import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilCallback, useRecoilValueLoadable } from "recoil";
import Header from "../components/header/Header";
import MusixPlayer from "../components/player/MusixPlayer";
import DesktopSideBar from "../components/sidebar/DesktopSideBar";
import MobileSideBar from "../components/sidebar/MobileSideBar";
import AgentDetect from "../components/util/AgentDetect";
import CustomSuspense from "../components/util/CustomSuspense";
import { spotifyAuthState } from "../selector/auth.selector.js";
import { spotifyAuth } from "../utils/spotify.utils.js";
import { pxToRem } from "../utils/theme.utils.js";

export default function HomePage() {
  const ref = useRef();
  const spotifyAuthLodableState =
    useRecoilValueLoadable(spotifyAuthState).state;
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const handleScroll = (scrollTop, scrollHeight) => {
    let opacity = scrollTop / scrollHeight / 0.15;
    if (opacity <= 1) {
      setHeaderOpacity(opacity);
    } else {
      setHeaderOpacity(1);
    }
  };

  const spotifyAuthCallback = useRecoilCallback(
    () => async () => {
      await spotifyAuth();
    },
    []
  );

  React.useEffect(() => {
    const intervalId = setInterval(spotifyAuthCallback, 3599 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <Flex direction={"column"} wrap={"nowrap"}>
      <Flex direction={"row"} wrap={"nowrap"}>
        <DesktopSideBar />
        <Flex
          ref={ref}
          direction={"column"}
          width={"100%"}
          height={`calc(100vh - ${pxToRem(100)})`}
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
          <CustomSuspense
            fallback={
              <Box pos={"relative"} top={"30%"} textAlign={"center"}>
                <Spinner />
              </Box>
            }
            state={spotifyAuthLodableState}
          >
            <Outlet />
          </CustomSuspense>
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
