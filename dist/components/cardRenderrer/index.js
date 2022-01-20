import React from "../../../_snowpack/pkg/react.js";
import {Grid} from "../../../_snowpack/pkg/@chakra-ui/react.js";
function CardRenderer({
  minCardWidth,
  children,
  noOfRows,
  autoRows,
  ...otherProps
}) {
  return /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: `repeat(auto-fill,minmax(${minCardWidth},1fr))`,
    templateRows: `repeat(${noOfRows},1fr)`,
    autoRows: otherProps.overflowY != "hidden" ? void 0 : autoRows,
    rowGap: "0.7rem",
    columnGap: "0.7rem",
    ...otherProps
  }, children);
}
CardRenderer.defaultProps = {
  minCardWidth: "180px",
  noOfRows: 1,
  columnGap: "0.7rem",
  overflowX: "auto",
  overflowY: "hidden",
  autoRows: 0
};
export default CardRenderer;
