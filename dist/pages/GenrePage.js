import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Spinner} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useLocation, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import ContentWrapper, {
  contentWrapperState
} from "../components/ContentWrapper/ContentWrapper.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import {showContentConversionUtil} from "../utils/conversion.utils.js";
import {pxToAll} from "../utils/theme.utils.js";
export default function GenrePage() {
  const location = useLocation();
  const params = useParams().property;
  let rs = {};
  if (location.state) {
    rs = location.state;
  } else {
    rs = showContentConversionUtil().find((ele) => ele.property === params);
    rs["limit"] = 20;
  }
  const showAllContentLoadable = useRecoilValueLoadable(contentWrapperState(rs));
  const contents = showAllContentLoadable.contents;
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    fallback: /* @__PURE__ */ React.createElement(Box, {
      textAlign: "center",
      pos: "relative",
      height: "100%",
      top: "30%"
    }, /* @__PURE__ */ React.createElement(Spinner, null)),
    state: showAllContentLoadable.state
  }, /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    px: pxToAll(20)
  }, /* @__PURE__ */ React.createElement(ContentWrapper, {
    ...contents,
    autoRows: "auto",
    seeAll: false
  })));
}
