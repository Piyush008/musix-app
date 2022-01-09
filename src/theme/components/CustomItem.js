import { pxToAll, pxToRem } from "../../utils/theme.utils.js";

const CustomItem = {
  baseStyle: {
    _hover: {
      transition: "color 0.5s",
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
    sm: {
      fontSize: pxToAll(16),
      fontWeight: "normal",
      lineHeight: 1.25,
    },
  },
  variants: {
    solid: {
      fontWeight: "bold",
    },
    tab: {
      fontWeight: "normal",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      _active: {
        bg: "gray.600",
        transition: "background 0.5s",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export default CustomItem;
