import React from "../../../_snowpack/pkg/react.js";
import {Grid} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {pxToRem, pxToRemSm} from "../../utils/theme.utils.js";
import AgentDetect from "../util/AgentDetect.js";
function CardRenderer({
  minCardWidth,
  children,
  noOfRows,
  autoRows,
  noOfChildren,
  ...otherProps
}) {
  return /* @__PURE__ */ React.createElement(AgentDetect, {
    desktopComponent: /* @__PURE__ */ React.createElement(Grid, {
      templateColumns: `repeat(auto-fill,minmax(${pxToRem(minCardWidth)},1fr))`,
      templateRows: `repeat(${noOfRows},1fr)`,
      autoRows: otherProps.overflowY != "hidden" ? void 0 : autoRows,
      rowGap: "0.7rem",
      columnGap: "0.7rem",
      ...otherProps
    }, children),
    mobileComponent: /* @__PURE__ */ React.createElement(Grid, {
      templateColumns: `repeat(${noOfChildren},minmax(${pxToRemSm(minCardWidth / 1.5)},1fr))`,
      templateRows: `repeat(${noOfRows},1fr)`,
      autoRows: otherProps.overflowY != "hidden" ? void 0 : autoRows,
      rowGap: "0.7rem",
      columnGap: "0.7rem",
      css: {
        "&::-webkit-scrollbar": {
          display: "none"
        }
      },
      ...otherProps
    }, children)
  });
}
CardRenderer.defaultProps = {
  minCardWidth: "200",
  noOfRows: 1,
  columnGap: "0.7rem",
  overflowX: "auto",
  overflowY: "hidden",
  autoRows: 0,
  noOfChildren: 6
};
export default CardRenderer;