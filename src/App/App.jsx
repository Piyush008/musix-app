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
import { useSetRecoilState } from "recoil";
import {
  authConfig,
  handleAfterAuth,
  musixToken,
} from "../utils/auth.utils.js";
import { useEffect } from "react";
import { musixAxios } from "../utils/axios.utils.js";
import { authState } from "../atoms/auth.atoms.js";
import ArtistPage from "../pages/ArtistPage";

export default function App() {
  console.log(import.meta.env);
  const basename = import.meta.env.MODE === "development" ? "/" : "/musix-app";
  const setAuth = useSetRecoilState(authState);

  const handleSuccess = async (resp) => {
    if (resp) {
      const {
        accessToken,
        profileObj: { email, googleId, imageUrl, name },
      } = resp;
      try {
        const resp2 = await musixAxios(musixToken()).post("/users/", {
          email,
          imageUrl,
          providerId: googleId,
          userName: name,
        });
        if (resp2.data.success) {
          setAuth((prevState) => ({ ...prevState, isAuth: true }));
          handleAfterAuth(accessToken, email);
        }
      } catch (e) {
        setAuth((prevState) => ({ ...prevState, isAuth: false }));
      }
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
    accessType: "offline",
  });

  useEffect(() => {
    if (loaded) {
      setAuth((prevState) => ({ ...prevState, signIn }));
    }
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
            <Route
              path={`${ROUTER.ARTIST}/:artistId`}
              element={<ArtistPage />}
            />
            <Route path="*" element={<NoMatchPage />} />
          </Route>
        </Routes>
      </Router>
    );
  return null;
}
