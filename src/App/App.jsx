import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import HomeContentPage from "../pages/HomeContentPage";
import NoMatchPage from "../pages/NoMatchPage";
import ROUTER from "../utils/constants/router.constants.js";
import SearchContentPage from "../pages/SearchContentPage";
export default function App() {
  const basename = import.meta.env.MODE === "development" ? "/" : "/musix-app";
  return (
    <Router basename={"/"}>
      <Routes>
        <Route path={`${ROUTER.HOME}*`} element={<HomePage />}>
          <Route index element={<HomeContentPage />} />
          <Route path={ROUTER.SEARCH} element={<SearchPage />}>
            <Route path=":searchText" element={<SearchContentPage />} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
