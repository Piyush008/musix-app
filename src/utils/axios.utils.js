import axios from "axios";
import { MUSIX_URL, SPOTIFY_URL } from "./constants/url.constants.js";
import { musixToken } from "./auth.utils.js";

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
const musixAxios = (auth) => createAxiosInstance(auth, MUSIX_URL);
const spotifyAxios = (auth) => createAxiosInstance(auth, SPOTIFY_URL);
export { musixAxios, spotifyAxios };
