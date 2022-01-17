import React from "../../_snowpack/pkg/react.js";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {MdSearch} from "../../_snowpack/pkg/react-icons/md.js";
import {Outlet} from "../../_snowpack/pkg/react-router-dom.js";
import AgentDetect from "../components/util/AgentDetect.js";
import {pxToAll} from "../utils/theme.utils.js";
export default function SearchPage() {
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    p: pxToAll(20),
    height: "100%"
  }, /* @__PURE__ */ React.createElement(AgentDetect, {
    mobileComponent: /* @__PURE__ */ React.createElement(VStack, {
      mb: pxToAll(10)
    }, /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, {
      textStyle: "h4",
      color: "text.secondary"
    }, "Search")), /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputLeftElement, {
      children: /* @__PURE__ */ React.createElement(Icon, {
        as: MdSearch,
        textStyle: "icon.md"
      })
    }), /* @__PURE__ */ React.createElement(Input, {
      "aria-label": "search"
    })))
  }), /* @__PURE__ */ React.createElement(Outlet, null));
}
