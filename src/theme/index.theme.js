import { extendTheme } from "@chakra-ui/react";
import typography from "./foundations/typography";
import breakpoints from "./foundations/breakpoints";
import styles from "./styles.global";
import CustomItem from "./components/CustomItem";
import Button from "./components/Button";
import { pxToAll, pxToRem, pxToRemSm } from "../utils/theme.utils.js";
import colors from "./foundations/colors";
import Input from "./components/Input";
const theme = extendTheme({
  breakpoints,
  ...typography,
  colors,
  components: {
    CustomItem,
    Button,
    Input,
  },
  layerStyles: {
    selected: {
      bg: "shade.secondary",
      borderRadius: "5px",
      color: "text.secondary",
    },
    iconDisabled: {
      color: "text.disabled",
      cursor: "not-allowed",
    },
    iconActive: {
      color: "text.secondary",
      cursor: "pointer",
    },
  },
  textStyles: {
    h3: {
      fontSize: pxToAll(36),
      fontWeight: "bold",
      lineHeight: 1.5,
    },
    h4: {
      fontSize: pxToAll(32),
      fontWeight: "bold",
      lineHeight: 1.5,
    },
    h5: {
      fontSize: pxToAll(28),
      fontWeight: "bold",
      lineHeight: 1.5,
    },
    h6: {
      fontSize: pxToAll(24),
      fontWeight: "normal",
      lineHeight: 1.25,
    },
    p: {
      fontSize: pxToAll(22),
      fontWeight: "normal",
      lineHeight: 1.25,
    },
    icon: {
      md: {
        fontSize: pxToAll(24),
      },
      sm: {
        fontSize: pxToAll(24),
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles,
});

export default theme;
