import { pxToAll, pxToRem } from "../../utils/theme.utils.js";

const Input = {
  baseStyle: {
    field: {
      transitionProperty: "initial",
    },
  },
  sizes: {
    md: {
      field: {
        fontSize: pxToAll(18),
        h: pxToAll(40),
        px: pxToAll(15),
        py: pxToAll(15),
      },
      element: {
        px: pxToAll(5),
        top: "25%",
      },
    },
  },
  variants: {
    normal: {
      field: {
        bg: "shade.hoverPrimary",
        borderRadius: pxToRem(25),
        _focus: {
          boxShadow: `0 0 ${pxToRem(5)} rgba(0,0,0,0.5)`,
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "normal",
  },
};

export default Input;
