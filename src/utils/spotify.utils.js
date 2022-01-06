import { spotifyAxios } from "./axios.utils";
import { SPOTIFY_AUTH } from "./constants/privateKey.constants";

export async function spotifyAuth() {
  let data = undefined,
    error = undefined;
  try {
    const resp = await spotifyAxios(SPOTIFY_AUTH).post(
      "https://accounts.spotify.com/api/token?grant_typ=client_credentials",
      null,
      { baseURL: "" }
    );
    data = resp.data;
  } catch (e) {
    error = e.toString();
  }
  return [data, error];
}

const createSpotifyAxiosInstance = async (auth, url, query) => {
  let data = undefined,
    error = undefined;
  try {
    const resp = await spotifyAxios(auth).get(url, {
      params: query,
    });
    data = resp.data;
  } catch (e) {
    error = e.toString();
  }
  return [data, error];
};

export const getNewReleases = async (auth, query) =>
  await createSpotifyAxiosInstance(auth, "/browse/new-releases", query);

export const getAlbums = async (auth, query) =>
  await createSpotifyAxiosInstance(auth, "/albums", query);

export const getAlbumTracks = async (auth, id, query) =>
  await createSpotifyAxiosInstance(auth, `/albums/${id}/tracks`, query);

export const getArtists = async (auth, query) =>
  await createSpotifyAxiosInstance(auth, "/artists", query);

export const getArtistAlbums = async (auth, id, query) =>
  await createSpotifyAxiosInstance(auth, `/artists/${id}/albums`, query);

export const getArtistTopTracks = async (auth, id, query) =>
  await createSpotifyAxiosInstance(auth, `/artists/${id}/top-tracks`, query);

export const getRelatedArtists = async (auth, id, query) =>
  await createSpotifyAxiosInstance(
    auth,
    `/artists/${id}/related-artists`,
    query
  );

export const getTracks = async (auth, query) =>
  await createSpotifyAxiosInstance(auth, "/tracks", query);
