import React from "../../_snowpack/pkg/react.js";
import {Box} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Outlet} from "../../_snowpack/pkg/react-router-dom.js";
import {useRecoilValueLoadable} from "../../_snowpack/pkg/recoil.js";
import {searchDetailsState} from "../components/Input/SearchInput.js";
export default function SearchPage() {
  const searchDetails = useRecoilValueLoadable(searchDetailsState);
  console.log(searchDetails.state);
  return /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Outlet, null));
}
