import React from "react";

export default function useAgent() {
  return React.useMemo(() => navigator.userAgentData.mobile, []);
}
