import React from "../../../_snowpack/pkg/react.js";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {MdClose, MdSearch} from "../../../_snowpack/pkg/react-icons/md.js";
import {useNavigate, useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {atom, selectorFamily, useRecoilState} from "../../../_snowpack/pkg/recoil.js";
import {searchItems} from "../../utils/spotify.utils.js";
export const searchTextState = atom({
  key: "searchTextState",
  default: ""
});
export const searchDetailsState = selectorFamily({
  key: "searchDetailsState",
  get: (searchText) => async () => {
    const [data, error] = await searchItems({
      q: searchText,
      type: "track,artist,album,playlist",
      limit: 5,
      country: "IN"
    });
    if (error)
      throw "Failure";
    return data;
  }
});
export default function SearchInput({...rest}) {
  const [modSearchText, setSearchText] = useRecoilState(searchTextState);
  const navigate = useNavigate();
  const searchText = useParams()?.searchText ?? "";
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
    setSearchText(searchText);
  }, []);
  const handleChange = (value) => {
    navigate(`${value}`);
    setSearchText(value);
  };
  return /* @__PURE__ */ React.createElement(InputGroup, {
    ...rest
  }, /* @__PURE__ */ React.createElement(InputLeftElement, {
    children: /* @__PURE__ */ React.createElement(Icon, {
      as: MdSearch,
      textStyle: "icon.md"
    })
  }), /* @__PURE__ */ React.createElement(Input, {
    type: "text",
    placeholder: "Songs,artists,albums",
    "aria-label": "search",
    onChange: (e) => handleChange(e.target.value),
    value: modSearchText,
    ref: inputRef
  }), /* @__PURE__ */ React.createElement(InputRightElement, {
    children: !!modSearchText ? /* @__PURE__ */ React.createElement(Icon, {
      as: MdClose,
      textStyle: "icon.md"
    }) : null,
    onClick: () => handleChange("")
  }));
}
