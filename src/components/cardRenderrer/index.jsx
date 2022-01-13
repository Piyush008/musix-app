import { Grid } from "@chakra-ui/react";

function CardRenderer({ minCardWidth, children, noOfRows, ...otherProps }) {
  return (
    <Grid
      templateColumns={`repeat(auto-fill,minmax(${minCardWidth},1fr))`}
      templateRows={`repeat(${noOfRows},1fr)`}
      autoRows={otherProps.overflowY != "hidden" ? undefined : "0"}
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
};

export default CardRenderer;
