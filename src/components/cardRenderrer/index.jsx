import { Grid } from "@chakra-ui/react";

function CardRenderer({
  minCardWidth,
  children,
  noOfRows,
  autoRows,
  ...otherProps
}) {
  return (
    <Grid
      templateColumns={`repeat(auto-fill,minmax(${minCardWidth},1fr))`}
      templateRows={`repeat(${noOfRows},1fr)`}
      autoRows={otherProps.overflowY != "hidden" ? undefined : autoRows}
      rowGap={otherProps.overflowY == "hidden" ? undefined : "0.7rem"}
      {...otherProps}
    >
      {children}
    </Grid>
  );
}

CardRenderer.defaultProps = {
  minCardWidth: "160px",
  noOfRows: 1,
  columnGap: "0.7rem",
  overflowX: "auto",
  overflowY: "hidden",
  autoRows: 0,
};

export default CardRenderer;