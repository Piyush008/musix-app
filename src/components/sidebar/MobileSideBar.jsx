import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";
import {
  MdHome,
  MdLibraryBooks,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ROUTER from "../../utils/constants/router.constants.js";
import { pxToAll, pxToRem } from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem.jsx";

export default function MobileSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  console.log(pathName);
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <HStack
      justify={"space-evenly"}
      height={pxToAll(75)}
      pos={"fixed"}
      bottom={"0"}
      w={"100%"}
      bg={"brand.secondary"}
      zIndex={"1"}
      boxShadow={`0 -5px 25px rgba(0,0,0,0.2)`}
    >
      <CustomItem
        variant="tab"
        size="sm"
        onClick={() => handleNavigate(ROUTER.HOME)}
        layerStyle={pathName == ROUTER.HOME && "iconActive"}
      >
        <Icon as={MdHome} textStyle={"icon.sm"} />
        <Text>Home</Text>
      </CustomItem>
      <CustomItem
        variant="tab"
        size="sm"
        onClick={() => handleNavigate(ROUTER.SEARCH)}
        layerStyle={pathName.includes(`/${ROUTER.SEARCH}`) && "iconActive"}
      >
        <Icon as={MdSearch} textStyle={"icon.sm"} />
        <Text textStyle={"label"}>Search</Text>
      </CustomItem>
      <CustomItem variant="tab" size="sm">
        <Icon as={MdLibraryBooks} textStyle={"icon.sm"} />
        <Text>Playlist</Text>
      </CustomItem>
      <CustomItem variant="tab" size="sm">
        <Icon as={FcLike} textStyle={"icon.sm"} />
        <Text>Liked Songs</Text>
      </CustomItem>
    </HStack>
  );
}
