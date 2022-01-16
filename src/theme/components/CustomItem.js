import { pxToAll } from "../../utils/theme.utils.js";

const tab = (br = "50%", dur = "0.25") => ({
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
    borderRadius: br,
    opacity: 0.5,
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
      transition: `all ${dur}s cubic-bezier(.13,.94,.13,.95)`,
    },
  },
});
const CustomItem = {
  baseStyle: {
    pos: "relative",
  },
  sizes: {
    md: {
      fontSize: pxToAll(18),
      fontWeight: "bold",
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
    item: {
      cursor: "pointer",
      _hover: {
        transition: "color 0.5s",
        color: "text.secondary",
      },
    },
    tab: tab(),
    card: {
      borderRadius: "10px",
      ...tab("10px", "0.5"),
    },
  },
  defaultProps: {
    size: "md",
    variant: "item",
  },
};

export default CustomItem;
