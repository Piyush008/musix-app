import React from "../../../_snowpack/pkg/react.js";
import {useState} from "../../../_snowpack/pkg/react.js";
import {
  Avatar,
  Box,
  Circle,
  HStack,
  Icon,
  useMediaQuery,
  IconButton,
  Wrap,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSearch
} from "../../../_snowpack/pkg/react-icons/md.js";
import {pxToAll} from "../../utils/theme.utils.js";
import Logo from "../logo/Logo.js";
import useAgent from "../../hooks/useAgent.js";
import {Route, Routes} from "../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
export default function Header() {
  const isMobile = useAgent();
  return /* @__PURE__ */ React.createElement(HStack, {
    justifyContent: "space-between",
    h: pxToAll(80),
    alignItems: "center"
  }, !isMobile ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Circle, {
    size: pxToAll(35),
    bg: "shade.secondary"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdKeyboardArrowLeft,
    textStyle: "icon.md"
  })), /* @__PURE__ */ React.createElement(Circle, {
    size: pxToAll(35),
    bg: "shade.secondary"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdKeyboardArrowRight,
    textStyle: "icon.md"
  })), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: `${ROUTER.SEARCH}/*`,
    element: /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputLeftElement, {
      children: /* @__PURE__ */ React.createElement(Icon, {
        as: MdSearch,
        textStyle: "icon.md"
      })
    }), /* @__PURE__ */ React.createElement(Input, null))
  }))), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Button, null, "Enter Musix"))) : /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: `${ROUTER.SEARCH}/*`,
    element: /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputLeftElement, {
      children: /* @__PURE__ */ React.createElement(Icon, {
        as: MdSearch,
        textStyle: "icon.md"
      })
    }), /* @__PURE__ */ React.createElement(Input, null))
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "*",
    element: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Logo, null), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Button, null, "Enter Musix")))
  })));
}
