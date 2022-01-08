import React from "../../../_snowpack/pkg/react.js";
import {Box, useStyleConfig} from "../../../_snowpack/pkg/@chakra-ui/react.js";
export default function CustomItem(props) {
  const {variant, size, ...rest} = props;
  const styles = useStyleConfig("CustomItem", {variant, size});
  return /* @__PURE__ */ React.createElement(Box, {
    __css: styles,
    ...rest
  });
}
