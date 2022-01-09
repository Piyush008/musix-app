import { pxToAll } from "../../utils/theme.utils";

const Button = {
  baseStyle: {
    bg: "shade.primary",
    borderRadius: "25px",
  },
  sizes: {
    md: {
      fontSize: pxToAll(18),
      lineHeight: 1.25,
      px: pxToAll(15),
      py: pxToAll(10),
      height: "max-content",
      minWidth: "max-content",
    },
  },
  variants: {
    normal: {
      boxShadow: `0 0 5px rgba(0,0,0, 0.36)`,
      transitionProperty: "initial",
      _active: {
        px: pxToAll(13.5),
        py: pxToAll(8),
        boxShadow: "none",
      },
      _hover: {
        bg: "shade.hoverPrimary",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "normal",
  },
};

export default Button;
