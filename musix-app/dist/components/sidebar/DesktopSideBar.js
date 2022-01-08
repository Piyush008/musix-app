import React from "../../../../_snowpack/pkg/react.js";
import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  useMediaQuery,
  useStyleConfig
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {
  MdHome,
  MdLibraryBooks,
  MdPlaylistAdd,
  MdSearch
} from "../../../../_snowpack/pkg/react-icons/md.js";
import {FcLike} from "../../../../_snowpack/pkg/react-icons/fc.js";
import {pxToAll, pxToRem} from "../../utils/theme.utils.js";
import Logo from "../logo/Logo.js";
import {useLocation, useNavigate, useParams} from "../../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
import useAgent from "../../hooks/useAgent.js";
function CustomItem(props) {
  const {variant, size, ...rest} = props;
  const styles = useStyleConfig("CustomItem", {variant, size});
  return /* @__PURE__ */ React.createElement(Box, {
    __css: styles,
    ...rest
  });
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
    return /* @__PURE__ */ React.createElement(Flex, {
      direction: "column",
      bg: "shade.primary",
      minW: pxToAll(230),
      pr: pxToAll(10),
      boxShadow: `0 0 ${pxToRem(5)} rgba(0,0,0, 0.36)`,
      borderBottomRightRadius: `${pxToRem(10)}`,
      borderTopRightRadius: `${pxToRem(10)}`
    }, /* @__PURE__ */ React.createElement(Box, {
      my: pxToAll(30),
      ml: pxToAll(20)
    }, /* @__PURE__ */ React.createElement(Logo, null)), /* @__PURE__ */ React.createElement(List, {
      ml: pxToAll(10)
    }, /* @__PURE__ */ React.createElement(CustomItem, {
      onClick: () => handleNavigate(ROUTER.HOME),
      layerStyle: pathName == ROUTER.HOME && "selected"
    }, /* @__PURE__ */ React.createElement(ListIcon, {
      as: MdHome,
      textStyle: "iconMd"
    }), "Home"), /* @__PURE__ */ React.createElement(CustomItem, {
      onClick: () => handleNavigate(ROUTER.SEARCH),
      layerStyle: pathName == `/${ROUTER.SEARCH}` && "selected"
    }, /* @__PURE__ */ React.createElement(ListIcon, {
      as: MdSearch,
      textStyle: "iconMd"
    }), "Search"), /* @__PURE__ */ React.createElement(CustomItem, null, /* @__PURE__ */ React.createElement(ListIcon, {
      as: MdLibraryBooks,
      textStyle: "iconMd"
    }), "Library")), /* @__PURE__ */ React.createElement(List, {
      mt: pxToAll(20),
      ml: pxToAll(10)
    }, /* @__PURE__ */ React.createElement(CustomItem, null, /* @__PURE__ */ React.createElement(ListIcon, {
      as: MdPlaylistAdd,
      textStyle: "iconMd"
    }), "Create Playlist"), /* @__PURE__ */ React.createElement(CustomItem, null, /* @__PURE__ */ React.createElement(ListIcon, {
      as: FcLike,
      textStyle: "iconMd"
    }), "Liked Songs")), /* @__PURE__ */ React.createElement(Divider, {
      orientation: "horizontal",
      colorScheme: "teal",
      ml: pxToAll(10),
      w: "90%",
      mt: pxToAll(20)
    }));
  return /* @__PURE__ */ React.createElement(Box, null);
}