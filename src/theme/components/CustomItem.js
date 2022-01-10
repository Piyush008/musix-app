import { pxToAll, pxToRem } from "../../utils/theme.utils.js";

const CustomItem = {
  baseStyle: {
    pos: "relative",
  },
  sizes: {
    md: {
      fontSize: pxToAll(18),
      lineHeight: 1.25,
      p: pxToAll(10),
    },
    sm: {
      fontSize: pxToAll(18),
      fontWeight: "normal",
      lineHeight: 1.25,
      p: pxToAll(10),
    },
  },
  variants: {
    solid: {
      fontWeight: "bold",
      cursor: "pointer",
      _hover: {
        transition: "color 0.5s",
        color: "text.secondary",
      },
    },
    tab: {
      fontWeight: "normal",
      textAlign: "center",
      _before: {
        pos: "absolute",
        overflow: "hidden",
        top: "50%",
        left: "50%",
        bottom: "50%",
        right: "50%",
        content: '""',
        bg: "text.secondary",
        borderRadius: "50%",
      },
      _active: {
        transitionProperty: "initial",
        color: "text.secondary",
        _before: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0,
          transition: "all .25s cubic-bezier(.13,.94,.13,.95)",
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export default CustomItem;
