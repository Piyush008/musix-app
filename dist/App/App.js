import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import React from "../../_snowpack/pkg/react.js";
import {BrowserRouter as Router, Route, Routes} from "../../_snowpack/pkg/react-router-dom.js";
import HomePage from "../pages/HomePage.js";
import SearchPage from "../pages/SearchPage.js";
import HomeContentPage from "../pages/HomeContentPage.js";
import NoMatchPage from "../pages/NoMatchPage.js";
import ROUTER from "../utils/constants/router.constants.js";
import SearchContentPage from "../pages/SearchContentPage.js";
import SearchTextContentPage from "../pages/SearchTextContentPage.js";
export default function App() {
  console.log(__SNOWPACK_ENV__);
  const basename = __SNOWPACK_ENV__.MODE === "development" ? "/" : "/musix-app";
  return /* @__PURE__ */ React.createElement(Router, {
    basename
  }, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: `${ROUTER.HOME}*`,
    element: /* @__PURE__ */ React.createElement(HomePage, null)
  }, /* @__PURE__ */ React.createElement(Route, {
    index: true,
    element: /* @__PURE__ */ React.createElement(HomeContentPage, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: ROUTER.SEARCH,
    element: /* @__PURE__ */ React.createElement(SearchPage, null)
  }, /* @__PURE__ */ React.createElement(Route, {
    index: true,
    element: /* @__PURE__ */ React.createElement(SearchContentPage, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: ":searchText",
    element: /* @__PURE__ */ React.createElement(SearchTextContentPage, null)
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "*",
    element: /* @__PURE__ */ React.createElement(NoMatchPage, null)
  }))));
}
