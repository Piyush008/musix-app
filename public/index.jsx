/* Add JavaScript code here! */
import App from "../src/App";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import theme from "../src/theme/index.theme.js";
function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  React.useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}
ReactDOM.render(
  <RecoilRoot>
    <DebugObserver />
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
