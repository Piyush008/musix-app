import React from "../../../_snowpack/pkg/react.js";
import {Box, Center, HStack, Icon, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {FcLike} from "../../../_snowpack/pkg/react-icons/fc.js";
import {
  MdHome,
  MdLibraryBooks,
  MdPlaylistAdd,
  MdSearch
} from "../../../_snowpack/pkg/react-icons/md.js";
import {useLocation, useNavigate, useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {pxToAll, pxToRem} from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem.js";
export default function MobileSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  console.log(params);
  const pathName = location.pathname;
  const handleNavigate = (path) => {
    navigate(path);
  };
  return /* @__PURE__ */ React.createElement(HStack, {
    justify: "space-evenly",
    height: pxToAll(75),
    pos: "fixed",
    bottom: "0",
    w: "100%",
    bg: "brand.secondary",
    zIndex: "1",
    boxShadow: `0 -5px 25px rgba(0,0,0,0.2)`
  }, /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "tab",
    size: "sm",
    onClick: () => handleNavigate(ROUTER.HOME)
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdHome,
    textStyle: "icon.sm"
  }), /* @__PURE__ */ React.createElement(Text, null, "Home")), /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "tab",
    size: "sm",
    onClick: () => handleNavigate(ROUTER.SEARCH)
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdSearch,
    textStyle: "icon.sm"
  }), /* @__PURE__ */ React.createElement(Text, {
    textStyle: "label"
  }, "Search")), /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "tab",
    size: "sm"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdLibraryBooks,
    textStyle: "icon.sm"
  }), /* @__PURE__ */ React.createElement(Text, null, "Playlist")), /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "tab",
    size: "sm"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: FcLike,
    textStyle: "icon.sm"
  }), /* @__PURE__ */ React.createElement(Text, null, "Liked Songs")));
}
