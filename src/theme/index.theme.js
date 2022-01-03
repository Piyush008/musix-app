import { extendTheme } from "@chakra-ui/react";
import typography from "./foundations/typography";
import breakpoints from "./foundations/breakpoints";
import styles from "./styles.global";
import CustomItem from "./components/CustomItem";
import { pxToAll, pxToRem } from "../utils/theme.utils.js";
const theme = extendTheme({
  breakpoints,
  ...typography,
  components: {
    CustomItem,
  },
  layerStyles: {
    selected: {
      bg: "teal.900",
      borderRadius: pxToAll(5),
      color: "gray.300",
    },
    iconDisabled: {
      transition: "color 1s",
      color: "gray.500",
      cursor: "not-allowed",
    },
    iconActive: {
      transition: "color 1s",
      color: "gray.300",
      cursor: "pointer",
    },
    h4: {
      color: "gray.300",
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
    iconMd: {
      fontSize: pxToAll(24),
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles,
});

export default theme;
