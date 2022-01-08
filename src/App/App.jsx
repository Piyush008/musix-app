import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import HomeContentPage from "../pages/HomeContentPage";
import NoMatchPage from "../pages/NoMatchPage";
import ROUTER from "../utils/constants/router.constants.js";
export default function App() {
  return (
    <Router basename="/musix-app">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<HomeContentPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:textId" element={<HomeContentPage />} />
        </Route>
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Router>
  );
}
