import { Box, Divider, Flex, List, ListIcon } from "@chakra-ui/react";
import {
  MdHome,
  MdLibraryBooks,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { pxToAll } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import AgentDetect from "../util/AgentDetect.jsx";
import CustomItem from "../util/CustomItem.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth.atoms.js";
import useCustomToast from "../../hooks/useCustomToast.js";

export default function DesktopSideBar() {
  const auth = useRecoilValue(authState);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const location = useLocation();
  let pathName = location.pathname;
  const state = location.state;
  if (pathName.includes(`/${ROUTER.GENRE}`)) {
    pathName = state?.urlFrom ?? ROUTER.HOME;
  }
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <AgentDetect
      desktopComponent={
        <Flex
          direction={"column"}
          bg="shade.primary"
          minW={pxToAll(230)}
          pr={pxToAll(10)}
          boxShadow={`0 0 5px rgba(0,0,0, 0.36)`}
        >
          <Box my={pxToAll(30)} ml={pxToAll(20)}>
            <Logo />
          </Box>
          <List ml={pxToAll(10)}>
            <CustomItem
              onClick={() => handleNavigate(ROUTER.HOME)}
              layerStyle={pathName == ROUTER.HOME && "selected"}
            >
              <ListIcon as={MdHome} textStyle={"icon.md"} />
              Home
            </CustomItem>
            <CustomItem
              onClick={() => handleNavigate(ROUTER.SEARCH)}
              layerStyle={pathName.includes(`/${ROUTER.SEARCH}`) && "selected"}
            >
              <ListIcon as={MdSearch} textStyle={"icon.md"} />
              Search
            </CustomItem>
            <CustomItem>
              <ListIcon as={MdLibraryBooks} textStyle={"icon.md"} />
              Library
            </CustomItem>
          </List>
          <List mt={pxToAll(20)} ml={pxToAll(10)}>
            <CustomItem>
              <ListIcon as={MdPlaylistAdd} textStyle={"icon.md"} />
              Create Playlist
            </CustomItem>
            <CustomItem
              onClick={() => {
                if (auth.isAuth) handleNavigate("collection/tracks");
                else toast();
              }}
              layerStyle={pathName.includes(`/collection/tracks`) && "selected"}
            >
              <ListIcon as={FcLike} textStyle={"icon.md"} />
              Liked Songs
            </CustomItem>
          </List>
          <Divider
            orientation="horizontal"
            colorScheme={"teal"}
            ml={pxToAll(10)}
            w={"90%"}
            mt={pxToAll(20)}
          />
        </Flex>
      }
      mobileComponent={<Box />}
    />
  );
}
