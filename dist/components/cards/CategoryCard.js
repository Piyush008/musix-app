import React from "../../../_snowpack/pkg/react.js";
import {Image, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {pxToAll} from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem.js";
export default function CategoryCard(props) {
  const {icons, name, ...rest} = props;
  return /* @__PURE__ */ React.createElement(CustomItem, {
    ...rest,
    variant: "card"
  }, /* @__PURE__ */ React.createElement(Image, {
    src: icons[0].url,
    alt: name
  }), /* @__PURE__ */ React.createElement(Text, {
    mt: pxToAll(10)
  }, name));
}
