import React from "../../_snowpack/pkg/react.js";
import {Box, Flex, Spinner, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useLocation, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {
  atom,
  selector,
  useRecoilValueLoadable,
  useSetRecoilState
} from "../../_snowpack/pkg/recoil.js";
import ContentWrapper, {
  contentWrapperState
} from "../components/ContentWrapper/ContentWrapper.js";
import CustomSuspense from "../components/util/CustomSuspense.js";
import useAgent from "../hooks/useAgent.js";
import {showContentConversionUtil} from "../utils/conversion.utils.js";
import {pxToAll, pxToRem, pxToRemSm} from "../utils/theme.utils.js";
const genreParamState = atom({
  key: "genreParamState",
  default: {}
});
const genreContentState = selector({
  key: "genreContentState",
  get: ({get}) => {
    const params = get(genreParamState);
    return get(contentWrapperState(params));
  }
});
export default function GenrePage() {
  const location = useLocation();
  const params = useParams().property;
  const setGenreParam = useSetRecoilState(genreParamState);
  const isMobile = useAgent();
  React.useEffect(() => {
    let rs = {};
    if (location.state) {
      rs = location.state;
    } else {
      rs = showContentConversionUtil().find((ele) => ele.property === params);
      rs["limit"] = 20;
    }
    setGenreParam(rs);
  }, []);
  const showAllContentLoadable = useRecoilValueLoadable(genreContentState);
  const contents = showAllContentLoadable.contents;
  return /* @__PURE__ */ React.createElement(CustomSuspense, {
    fallback: /* @__PURE__ */ React.createElement(Box, {
      textAlign: "center",
      pos: "relative",
      height: "100%",
      top: "30%"
    }, /* @__PURE__ */ React.createElement(Spinner, null)),
    state: showAllContentLoadable.state
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, contents?.message?.name && /* @__PURE__ */ React.createElement(Box, {
    bgImage: contents.message?.icons?.[0]?.url,
    bgSize: "cover",
    bgRepeat: "no-repeat",
    width: isMobile ? "100%" : `calc(100vw - 9.1rem)`,
    position: "fixed",
    height: pxToRemSm(515 / 1.5)
  }), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    pos: "relative",
    top: contents.message?.name ? "30%" : "0"
  }, contents.message?.name && /* @__PURE__ */ React.createElement(Text, {
    textStyle: "h1",
    color: "text.secondary",
    ml: pxToAll(20),
    isTruncated: true
  }, contents?.message?.name), /* @__PURE__ */ React.createElement(Box, {
    px: pxToAll(20),
    bgGradient: contents.message?.name ? "linear(to-t,brand.secondary 70%, brand.primary 100%)" : "none"
  }, /* @__PURE__ */ React.createElement(ContentWrapper, {
    ...contents,
    autoRows: "auto",
    seeAll: false
  })))));
}
