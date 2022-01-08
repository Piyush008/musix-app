import React from "../../_snowpack/pkg/react.js";
import {BrowserRouter as Router, Route, Routes} from "../../_snowpack/pkg/react-router-dom.js";
import HomePage from "../pages/HomePage.js";
import SearchPage from "../pages/SearchPage.js";
import HomeContentPage from "../pages/HomeContentPage.js";
import NoMatchPage from "../pages/NoMatchPage.js";
import ROUTER from "../utils/constants/router.constants.js";
export default function App() {
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    element: /* @__PURE__ */ React.createElement(HomePage, null)
  }, /* @__PURE__ */ React.createElement(Route, {
    index: true,
    element: /* @__PURE__ */ React.createElement(HomeContentPage, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "search",
    element: /* @__PURE__ */ React.createElement(SearchPage, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "search/:textId",
    element: /* @__PURE__ */ React.createElement(HomeContentPage, null)
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "*",
    element: /* @__PURE__ */ React.createElement(NoMatchPage, null)
  })));
}
