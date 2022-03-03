import { pxToAll } from "../../utils/theme.utils";

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
        h: pxToAll(50),
        px: pxToAll(15),
        py: pxToAll(15),
      },
    },
  },
  variants: {
    normal: {
      field: {
        bg: "shade.primary",
        borderRadius: "25px",
        _focus: {
          boxShadow: `0 0 5px rgba(0,0,0,0.5)`,
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
