import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  useMediaQuery,
  useStyleConfig,
} from "@chakra-ui/react";
import {
  MdHome,
  MdLibraryBooks,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { pxToAll, pxToRem } from "../../utils/theme.utils.js";
import Logo from "../logo/Logo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import useAgent from "../../hooks/useAgent.js";
import AgentDetect from "../util/AgentDetect.jsx";
import CustomItem from "../util/CustomItem.jsx";

export default function DesktopSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  console.log(params);
  const pathName = location.pathname;

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
          borderBottomRightRadius={"10px"}
          borderTopRightRadius={"10px"}
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
              layerStyle={pathName == `/${ROUTER.SEARCH}` && "selected"}
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
            <CustomItem>
              <ListIcon as={FcLike} textStyle={"iconMd"} />
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
