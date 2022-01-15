import React from "../../../_snowpack/pkg/react.js";
export default function CustomSuspense(props) {
  const {state, fallback, children, ...rest} = props;
  let component = children;
  if (state === "loading")
    component = fallback;
  return /* @__PURE__ */ React.createElement(React.Fragment, {
    children: component,
    ...rest
  });
}
