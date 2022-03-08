import axios from "axios";
import { SPOTIFY_URL } from "./constants/url.constants.js";

function createAxiosInstance(auth, baseURL) {
  const headers = {
    Authorization: auth,
    "Content-Type": "application/json",
  };
  return axios.create({
    baseURL,
    headers,
  });
}
const musixAxios = (auth) =>
  createAxiosInstance(
    auth,
    `${import.meta.env.SNOWPACK_PUBLIC_REACT_APP_MUSIX_URL}`
  );
const spotifyAxios = (auth) => createAxiosInstance(auth, SPOTIFY_URL);
export { musixAxios, spotifyAxios };
