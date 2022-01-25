import React from "../../../_snowpack/pkg/react.js";
import {Image, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {useNavigate} from "../../../_snowpack/pkg/react-router-dom.js";
import {useSetRecoilState} from "../../../_snowpack/pkg/recoil.js";
import {genreParamState} from "../../pages/GenrePage.js";
import ROUTER from "../../utils/constants/router.constants.js";
import {pxToAll} from "../../utils/theme.utils.js";
import CustomItem from "../util/CustomItem.js";
export default function CategoryCard(props) {
  const {icons, name, property, ...rest} = props;
  const navigate = useNavigate();
  const setGenreParam = useSetRecoilState(genreParamState);
  return /* @__PURE__ */ React.createElement(CustomItem, {
    ...rest,
    variant: "card",
    onClick: () => {
      setGenreParam({
        as: "category",
        property,
        limit: 20
      });
      navigate(`/${ROUTER.GENRE}/${property}`, {
        state: {urlFrom: `/${ROUTER.SEARCH}`}
      });
    },
    p: 0
  }, /* @__PURE__ */ React.createElement(Image, {
    src: icons[0].url,
    alt: name,
    borderRadius: "10%"
  }), /* @__PURE__ */ React.createElement(Text, {
    mt: pxToAll(10)
  }, name));
}
