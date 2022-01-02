/* Add JavaScript code here! */
import App from "../src/App";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
