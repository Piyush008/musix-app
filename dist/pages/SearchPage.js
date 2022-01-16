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
import {selector, useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import CardRenderer from "../components/cardRenderrer/index.js";
import CategoryCard from "../components/cards/CategoryCard.js";
import AgentDetect from "../components/util/AgentDetect.js";
import {getSeveralCategories} from "../utils/spotify.utils.js";
import {pxToAll} from "../utils/theme.utils.js";
const allCategoryState = selector({
  key: "allCategoryState",
  get: async () => {
    const [data, error] = await getSeveralCategories({
      country: "IN"
    });
    if (error)
      throw error;
    return data;
  }
});
export default function SearchPage() {
  const categoryLoadable = useRecoilValueLoadable(allCategoryState);
  const items = categoryLoadable.contents?.categories?.items ?? [];
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    px: pxToAll(20),
    py: pxToAll(20)
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
  }), /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h5",
    color: "text.secondary"
  }, "Browse all"), /* @__PURE__ */ React.createElement(CardRenderer, {
    minCardWidth: "155px",
    autoRows: "auto"
  }, items.map(({id, ...rest}) => /* @__PURE__ */ React.createElement(CategoryCard, {
    key: id,
    ...rest
  }))), /* @__PURE__ */ React.createElement(Outlet, null));
}
