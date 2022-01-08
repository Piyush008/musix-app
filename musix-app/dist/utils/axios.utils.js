import { KJUR as kjur } from "../../../_snowpack/pkg/jsrsasign.js";
import axios from "../../../_snowpack/pkg/axios.js";
import { MUSIX_URL, SPOTIFY_URL } from "./constants/url.constants.js";

const musixToken = () => {
  const tNow = kjur.jws.IntDate.getNow();
  const tEnd = tNow + 30;
  const sHeader = JSON.stringify({ alg: "none", typ: "JWT" });
  const sPayload = JSON.stringify({ tNow, tEnd });
  return kjur.jws.JWS.sign("none", sHeader, sPayload);
};

function createAxiosInstance(auth, baseURL) {
  const headers = {
    Authorization: auth,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (baseURL === MUSIX_URL) headers["musix-token"] = musixToken();
  return axios.create({
    baseURL,
    headers,
  });
}
const musixAxios = (auth) => createAxiosInstance(auth, MUSIX_URL);
const spotifyAxios = (auth) => createAxiosInstance(auth, SPOTIFY_URL);
export { musixAxios, spotifyAxios };
