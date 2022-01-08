import React from "../../../_snowpack/pkg/react.js";

export default function useAgent() {
  return React.useMemo(() => navigator.userAgentData.mobile, []);
}
