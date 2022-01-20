import React from "../../../_snowpack/pkg/react.js";
import {Image, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {useNavigate} from "../../../_snowpack/pkg/react-router-dom.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {pxToAll} from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem.js";
export default function CategoryCard(props) {
  const {icons, name, property, ...rest} = props;
  const navigate = useNavigate();
  return /* @__PURE__ */ React.createElement(CustomItem, {
    ...rest,
    variant: "card",
    onClick: () => navigate(`/${ROUTER.GENRE}/${property}`, {
      state: {
        as: "category",
        property,
        limit: 20,
        urlFrom: `/${ROUTER.SEARCH}`
      }
    })
  }, /* @__PURE__ */ React.createElement(Image, {
    src: icons[0].url,
    alt: name,
    borderRadius: "10%"
  }), /* @__PURE__ */ React.createElement(Text, {
    mt: pxToAll(10)
  }, name));
}
