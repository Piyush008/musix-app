import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import HomeContentPage from "../pages/HomeContentPage";
import NoMatchPage from "../pages/NoMatchPage";
import ROUTER from "../utils/constants/router.constants.js";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTER.HOME} element={<HomePage />}>
          <Route index element={<HomeContentPage />} />
          <Route path={ROUTER.SEARCH} element={<SearchPage />} />
        </Route>
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Router>
  );
}
