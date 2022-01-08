import React from "../_snowpack/pkg/react.js";
import App from "./dist/App/index.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import {ChakraProvider, ColorModeScript} from "../_snowpack/pkg/@chakra-ui/react.js";
import {RecoilRoot} from "../_snowpack/pkg/recoil.js";
import theme from "./dist/theme/index.theme.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(RecoilRoot, null, /* @__PURE__ */ React.createElement(ChakraProvider, {
  theme
}, /* @__PURE__ */ React.createElement(ColorModeScript, {
  initialColorMode: theme.config.initialColorMode
}), /* @__PURE__ */ React.createElement(App, null))), document.getElementById("root"));
