import React from "../../../_snowpack/pkg/react.js";
import {HStack, Icon, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {FcLike} from "../../../_snowpack/pkg/react-icons/fc.js";
import {MdHome, MdLibraryBooks, MdSearch} from "../../../_snowpack/pkg/react-icons/md.js";
import {useLocation, useNavigate} from "../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {pxToAll} from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem.js";
export default function MobileSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  let pathName = location.pathname;
  const state = location.state;
  if (pathName.includes(`/${ROUTER.GENRE}`)) {
    pathName = state?.urlFrom ?? ROUTER.HOME;
  }
  console.log(pathName);
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
    onClick: () => handleNavigate(ROUTER.HOME),
    layerStyle: pathName == ROUTER.HOME && "iconActive"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdHome,
    textStyle: "icon.sm"
  }), /* @__PURE__ */ React.createElement(Text, null, "Home")), /* @__PURE__ */ React.createElement(CustomItem, {
    variant: "tab",
    size: "sm",
    onClick: () => handleNavigate(ROUTER.SEARCH),
    layerStyle: pathName.includes(`/${ROUTER.SEARCH}`) && "iconActive"
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