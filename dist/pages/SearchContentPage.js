import React from "../../_snowpack/pkg/react.js";
import {Box, Spinner, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {selector, selectorFamily, useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import CardRenderer from "../components/cardRenderrer/index.js";
import CategoryCard from "../components/cards/CategoryCard.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import {getSeveralCategories} from "../utils/spotify.utils.js";
import {pxToAll} from "../utils/theme.utils.js";
const allCategoryState = selectorFamily({
  key: "allCategoryState",
  get: (limit = 20) => async () => {
    const [data, error] = await getSeveralCategories({
      country: "IN",
      limit
    });
    if (error)
      throw error;
    return data;
  }
});
export default function SearchContentPage() {
  const categoryLoadable = useRecoilValueLoadable(allCategoryState(50));
  const items = categoryLoadable.contents?.categories?.items ?? [];
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    fallback: /* @__PURE__ */ React.createElement(Box, {
      pos: "relative",
      top: "30%",
      textAlign: "center"
    }, /* @__PURE__ */ React.createElement(Spinner, null)),
    state: categoryLoadable.state
  }, /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h5",
    color: "text.secondary"
  }, "Browse all"), /* @__PURE__ */ React.createElement(CardRenderer, {
    minCardWidth: "155px",
    autoRows: "auto"
  }, items.map(({id, ...rest}) => /* @__PURE__ */ React.createElement(CategoryCard, {
    key: id,
    ...rest
  })))));
}
