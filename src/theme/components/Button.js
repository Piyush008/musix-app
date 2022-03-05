import { pxToAll } from "../../utils/theme.utils";

const Button = {
  baseStyle: {
    bg: "brand.secondary",
    borderRadius: "25px",
    pos: "relative",
    cursor: "auto",
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
    mdlg: {
      fontSize: pxToAll(20),
      height: pxToAll(40),
      minWidth: pxToAll(40),
      borderRadius: "50%",
    },
    xl: {
      height: pxToAll(60),
      fontSize: pxToAll(24),
      minWidth: pxToAll(60),
      borderRadius: "50%",
    },
    lg: {
      height: pxToAll(50),
      fontSize: pxToAll(24),
      minWidth: pxToAll(50),
      borderRadius: "50%",
    },
  },
  variants: {
    normal: {
      boxShadow: `0 0 5px rgba(0,0,0, 0.36)`,
      transitionProperty: "initial",
      _hover: {
        bg: "shade.hoverPrimary",
      },
      _focus: {
        boxShadow: "none",
      },
      _before: {
        pos: "absolute",
        overflow: "hidden",
        top: "50%",
        left: "50%",
        bottom: "50%",
        right: "50%",
        content: '""',
        bg: "text.secondary",
        borderRadius: "25px",
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
          transition: "all 0.5s cubic-bezier(.13,.94,.13,.95)",
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "normal",
  },
};

export default Button;
