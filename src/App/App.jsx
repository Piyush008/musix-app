import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import HomeContentPage from "../pages/HomeContentPage";
import NoMatchPage from "../pages/NoMatchPage";
import ROUTER from "../utils/constants/router.constants.js";
import SearchContentPage from "../pages/SearchContentPage";
import SearchTextContentPage from "../pages/SearchTextContentPage";
import GenrePage from "../pages/GenrePage";
import AlbumPlayListPage from "../pages/AlbumPlayListPage";
export default function App() {
  console.log(import.meta.env);
  const basename = import.meta.env.MODE === "development" ? "/" : "/musix-app";
  return (
    <Router basename={basename}>
      <Routes>
        <Route path={`${ROUTER.HOME}*`} element={<HomePage />}>
          <Route index element={<HomeContentPage />} />
          <Route path={ROUTER.SEARCH} element={<SearchPage />}>
            <Route index element={<SearchContentPage />} />
            <Route path=":searchText" element={<SearchTextContentPage />} />
          </Route>
          <Route path={`${ROUTER.GENRE}/:property`} element={<GenrePage />} />
          <Route
            path={`${ROUTER.ALBUM}/:albumId`}
            element={<AlbumPlayListPage />}
          />
          <Route
            path={`${ROUTER.PLAYLIST}/:playlistId`}
            element={<AlbumPlayListPage />}
          />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
