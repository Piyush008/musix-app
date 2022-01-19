import React from "../../_snowpack/pkg/react.js";
import {Flex} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {selector, useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper.js";
import {showContentConversionUtil} from "../utils/conversion.utils.js";
import {pxToAll} from "../utils/theme.utils.js";
const showContentState = selector({
  key: "showContentState",
  get: () => {
    return showContentConversionUtil();
  }
});
export default function HomeContentPage() {
  const showContentsLoadable = useRecoilValueLoadable(showContentState);
  const showContents = showContentsLoadable.contents;
  return /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    py: pxToAll(20),
    px: pxToAll(20)
  }, showContents.map(({...rest}, idx) => /* @__PURE__ */ React.createElement(ContentWrapper, {
    key: idx,
    ...rest
  })));
}
