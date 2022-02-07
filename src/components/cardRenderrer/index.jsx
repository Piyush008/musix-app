import { Grid } from "@chakra-ui/react";
import { pxToRem, pxToRemSm } from "../../utils/theme.utils.js";
import AgentDetect from "../util/AgentDetect";

function CardRenderer({
  minCardWidth,
  children,
  noOfRows,
  autoRows,
  noOfChildren,
  ...otherProps
}) {
  return (
    <AgentDetect
      desktopComponent={
        <Grid
          templateColumns={`repeat(auto-fit,minmax(${pxToRem(
            minCardWidth
          )},1fr))`}
          templateRows={`repeat(${noOfRows},1fr)`}
          autoRows={otherProps.overflowY != "hidden" ? undefined : autoRows}
          rowGap={"0.7rem"}
          columnGap={"0.7rem"}
          {...otherProps}
        >
          {children}
        </Grid>
      }
      mobileComponent={
        <Grid
          templateColumns={`repeat(${noOfChildren},minmax(${pxToRemSm(
            minCardWidth / 1.5
          )},1fr))`}
          templateRows={`repeat(${noOfRows},1fr)`}
          autoRows={otherProps.overflowY != "hidden" ? undefined : autoRows}
          rowGap={"0.7rem"}
          columnGap={"0.7rem"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          {...otherProps}
        >
          {children}
        </Grid>
      }
    />
  );
}

CardRenderer.defaultProps = {
  minCardWidth: "200",
  noOfRows: 1,
  columnGap: "0.7rem",
  overflowX: "auto",
  overflowY: "hidden",
  autoRows: 0,
  noOfChildren: 6,
};

export default CardRenderer;
