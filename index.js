import React from "./_snowpack/pkg/react.js";
import App from "./dist/App/index.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import {ChakraProvider, ColorModeScript} from "./_snowpack/pkg/@chakra-ui/react.js";
import {RecoilRoot, useRecoilSnapshot} from "./_snowpack/pkg/recoil.js";
import theme from "./dist/theme/index.theme.js";
function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  React.useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return null;
}
ReactDOM.render(/* @__PURE__ */ React.createElement(RecoilRoot, null, /* @__PURE__ */ React.createElement(DebugObserver, null), /* @__PURE__ */ React.createElement(ChakraProvider, {
  theme
}, /* @__PURE__ */ React.createElement(ColorModeScript, {
  initialColorMode: theme.config.initialColorMode
}), /* @__PURE__ */ React.createElement(App, null))), document.getElementById("root"));
