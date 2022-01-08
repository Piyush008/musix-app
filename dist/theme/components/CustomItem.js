import { pxToAll, pxToRem } from "../../utils/theme.utils.js";

const CustomItem = {
  baseStyle: {
    _hover: {
      color: "text.secondary",
      cursor: "pointer",
    },
  },
  sizes: {
    md: {
      fontSize: pxToAll(18),
      lineHeight: 1.25,
      p: pxToAll(10),
    },
  },
  variants: {
    solid: {
      fontWeight: "bold",
    },
    normal: {
      fontWeight: "normal",
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export default CustomItem;
