import React from "../../../_snowpack/pkg/react.js";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {MdClose, MdSearch} from "../../../_snowpack/pkg/react-icons/md.js";
import {atom, selector, selectorFamily, useSetRecoilState} from "../../../_snowpack/pkg/recoil.js";
import {searchItems} from "../../utils/spotify.utils.js";
export const searchTextState = atom({
  key: "searchTextState",
  default: ""
});
export const searchDetailsState = selector({
  key: "searchDetailsState",
  get: async ({get}) => {
    const [data, error] = await searchItems({
      q: get(searchTextState),
      type: "track,artist,album"
    });
    if (error)
      throw "Failure";
    return data;
  }
});
export default function SearchInput(props) {
  const setSearchText = useSetRecoilState(searchTextState);
  return /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(InputLeftElement, {
    children: /* @__PURE__ */ React.createElement(Icon, {
      as: MdSearch,
      textStyle: "icon.md"
    })
  }), /* @__PURE__ */ React.createElement(Input, {
    "aria-label": "search",
    onChange: (e) => setSearchText(e.target.value)
  }), /* @__PURE__ */ React.createElement(InputRightElement, {
    children: /* @__PURE__ */ React.createElement(Icon, {
      as: MdClose,
      textStyle: "icon.md"
    })
  }));
}
