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
import useGoogleLogin from "react-google-login/src/use-google-login";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { authConfig, handleAfterAuth } from "../utils/auth.utils.js";
import { useEffect } from "react";

export const authState = atom({
  key: "authState",
  default: {
    isAuth: false,
    signIn: undefined,
  },
});
export default function App() {
  console.log(import.meta.env);
  const basename = import.meta.env.MODE === "development" ? "/" : "/musix-app";
  const setAuth = useSetRecoilState(authState);
  const handleSuccess = (resp) => {
    if (resp) {
      setAuth((prevState) => ({ ...prevState, isAuth: true }));
      handleAfterAuth(resp);
    }
  };
  const handleFailure = (resp) => {
    console.log(resp);
  };
  const { signIn, loaded } = useGoogleLogin({
    ...authConfig,
    uxMode: "redirect",
    autoLoad: false,
    onSuccess: handleSuccess,
    onFailure: handleFailure,
    onScriptLoadFailure: handleFailure,
    isSignedIn: true,
    redirectUri: "http://localhost:8080",
  });

  useEffect(() => {
    if (loaded) setAuth((prevState) => ({ ...prevState, signIn }));
  }, [loaded]);
  if (loaded)
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
  return null;
}
