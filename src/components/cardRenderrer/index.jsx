import { Grid } from "@chakra-ui/react";
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
          templateColumns={`repeat(auto-fill,minmax(${minCardWidth},1fr))`}
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
          templateColumns={`repeat(${noOfChildren},40vw)`}
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
  minCardWidth: "180px",
  noOfRows: 1,
  columnGap: "0.7rem",
  overflowX: "auto",
  overflowY: "hidden",
  autoRows: 0,
  noOfChildren: 6,
};

export default CardRenderer;
