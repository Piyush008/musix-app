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

function CustomItem(props) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("CustomItem", { variant, size });
  return <Box __css={styles} {...rest} />;
}

export default function DesktopSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  console.log(params);
  const pathName = location.pathname;
  const isMobile = useAgent();

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!isMobile)
    return (
      <Flex
        direction={"column"}
        bg="shade.primary"
        minW={pxToAll(230)}
        pr={pxToAll(10)}
        boxShadow={`0 0 ${pxToRem(5)} rgba(0,0,0, 0.36)`}
        borderBottomRightRadius={`${pxToRem(10)}`}
        borderTopRightRadius={`${pxToRem(10)}`}
      >
        <Box my={pxToAll(30)} ml={pxToAll(20)}>
          <Logo />
        </Box>
        <List ml={pxToAll(10)}>
          <CustomItem
            onClick={() => handleNavigate(ROUTER.HOME)}
            layerStyle={pathName == ROUTER.HOME && "selected"}
          >
            <ListIcon as={MdHome} textStyle={"iconMd"} />
            Home
          </CustomItem>
          <CustomItem
            onClick={() => handleNavigate(ROUTER.SEARCH)}
            layerStyle={pathName == `/${ROUTER.SEARCH}` && "selected"}
          >
            <ListIcon as={MdSearch} textStyle={"iconMd"} />
            Search
          </CustomItem>
          <CustomItem>
            <ListIcon as={MdLibraryBooks} textStyle={"iconMd"} />
            Library
          </CustomItem>
        </List>
        <List mt={pxToAll(20)} ml={pxToAll(10)}>
          <CustomItem>
            <ListIcon as={MdPlaylistAdd} textStyle={"iconMd"} />
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
    );
  return <Box />;
}
