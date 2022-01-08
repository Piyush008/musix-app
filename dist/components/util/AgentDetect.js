import React from "../../../_snowpack/pkg/react.js";
import useAgent from "../../hooks/useAgent.js";
export default function AgentDetect(props) {
  const isMobileDevice = useAgent();
  const {mobileComponent, desktopComponent, ...rest} = props;
  return /* @__PURE__ */ React.createElement(React.Fragment, {
    children: isMobileDevice ? mobileComponent : desktopComponent,
    ...rest
  });
}
