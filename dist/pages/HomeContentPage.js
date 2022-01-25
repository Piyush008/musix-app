import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Spinner} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {selector, useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import ContentWrapper, {
  contentWrapperState
} from "../components/ContentWrapper/ContentWrapper.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import useAgent from "../hooks/useAgent.js";
import {showContentConversionUtil} from "../utils/conversion.utils.js";
import {pxToAll} from "../utils/theme.utils.js";
const showContentState = selector({
  key: "showContentState",
  get: ({get}) => {
    const metaData = showContentConversionUtil();
    const data = metaData.map((content) => ({
      ...content,
      ...get(contentWrapperState({...content, limit: 6}))
    }));
    return {data};
  }
});
export default function HomeContentPage() {
  const showContentsLoadable = useRecoilValueLoadable(showContentState);
  const showContents = showContentsLoadable.contents?.data ?? [];
  const isMobile = useAgent();
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    fallback: /* @__PURE__ */ React.createElement(Box, {
      textAlign: "center",
      pos: "relative",
      height: "100%",
      top: "30%"
    }, /* @__PURE__ */ React.createElement(Spinner, null)),
    state: showContentsLoadable.state
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    pl: pxToAll(20)
  }, showContents.map(({...rest}, idx) => /* @__PURE__ */ React.createElement(ContentWrapper, {
    key: idx,
    ...rest,
    seeAll: !isMobile
  }))));
}
