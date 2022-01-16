import React from "../../_snowpack/pkg/react.js";
import {Box} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import {searchDetailsState} from "../components/Input/SearchInput.js";
export default function SearchTextContentPage() {
  const searchText = useParams()?.searchText.trim() ?? "";
  const searchDetailsLoadable = useRecoilValueLoadable(searchDetailsState(searchText));
  console.log(searchDetailsLoadable);
  return /* @__PURE__ */ React.createElement(Box, null);
}
