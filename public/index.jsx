/* Add JavaScript code here! */
import App from "../src/App";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import theme from "../src/theme/index.theme.js";
ReactDOM.render(
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
